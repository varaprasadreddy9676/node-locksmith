const fs = require(`fs`).promises;
const path = require(`path`);
const LockManager = require('../index');

jest.mock('fs', () => {
    return {
        promises: {
            readFile: jest.fn(),
            writeFile: jest.fn(),
            unlink: jest.fn(),
        },
    };
});
jest.mock(`ps-node`);     // Mock ps-node module
jest.mock(`path`);        // Mock path module

// Reset the state before each test
beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    // Set default mock implementations where necessary
    // For example, path.join should just return whatever filename is given
    path.join.mockImplementation((_, filename) => filename);
});

describe(`LockManager`, () => {
    const mockFileName = `test.lock`;
    let lockManager;

    beforeEach(() => {
        // Mock the path.join function to avoid dealing with __dirname
        path.join.mockReturnValue(mockFileName);

        lockManager = new LockManager(mockFileName);

        // Mock console.log and console.error to keep output clean during tests
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        };
    });

    describe(`createLock`, () => {
        it(`should create a lock file when it does not exist`, async () => {
            // Mock fs.writeFile to successfully write the file
            fs.writeFile.mockResolvedValue();

            await lockManager.createLock();

            expect(fs.writeFile).toHaveBeenCalledTimes(1);
            expect(fs.writeFile).toHaveBeenCalledWith(mockFileName, expect.any(String));
            expect(lockManager.lockAcquired).toBe(true);
            expect(console.log).toHaveBeenCalledWith(`Lock acquired (PID: ${process.pid}).`);
        });

        it(`should retry creating the lock file when an error is encountered`, async () => {
            // Fail the first writeFile attempt and then pass
            fs.writeFile
                .mockRejectedValueOnce(new Error(`Mock error on first attempt`))
                .mockResolvedValue();

            await lockManager.createLock();

            expect(fs.writeFile).toHaveBeenCalledTimes(2);
            expect(lockManager.lockAcquired).toBe(true);
        });

        it(`should fail to create a lock after maximum retries`, async () => {
            const maxRetries = 3;
            const error = new Error(`Mock file system write error`);

            // Always reject the writeFile attempts
            fs.writeFile.mockRejectedValue(error);

            // Process.exit needs to be mocked to prevent the actual process from exiting during tests
            process.exit = jest.fn();

            await lockManager.createLock(Infinity, maxRetries);

            expect(fs.writeFile).toHaveBeenCalledTimes(maxRetries + 1);
            expect(console.error).toHaveBeenCalledWith(`Error: Maximum retries reached.Unable to acquire the lock.Exiting.`);
            expect(process.exit).toHaveBeenCalledWith(1);
        }, 10000);


    });

    describe(`createLock with timeout`, () => {
        it(`should fail to create a lock due to timeout`, async () => {
            // Set writeFile to take longer than our timeout value by resolving after a delay
            const delay = 1000;
            const timeout = 500; // Timeout is less than the delay to force a failure

            fs.writeFile.mockImplementation(
                () => new Promise((resolve) => setTimeout(resolve, delay))
            );

            process.exit = jest.fn();

            await lockManager.createLock(timeout, 0);
            expect(fs.promises.writeFile).toHaveBeenCalledTimes(1); // Make sure this number matches how many times you expect it to be called
            expect(console.error).toHaveBeenCalledWith(`Error: Lock acquisition timed out. Unable to acquire the lock. Exiting.`);
            expect(process.exit).toHaveBeenCalledWith(1);
        }, 10000);
    });

    describe(`removeLock`, () => {
        it(`should remove the lock file when called`, async () => {
            fs.unlink.mockResolvedValue();

            await lockManager.removeLock();

            expect(fs.unlink).toHaveBeenCalledWith(mockFileName);
            expect(console.log).toHaveBeenCalledWith(`Lock released.`);
        });

        it(`should output an error if removing the lock file fails`, async () => {
            const error = new Error(`Mock file system unlink error`);
            fs.unlink.mockRejectedValue(error);

            await lockManager.removeLock();

            expect(fs.unlink).toHaveBeenCalledWith(mockFileName);
            expect(console.error).toHaveBeenCalledWith(`Error releasing the lock:`, error.message);
        });
    });

    describe(`checkLock`, () => {
        it(`should proceed to acquire the lock if no lock file exists`, async () => {
            const error = new Error(`ENOENT`);
            error.code = `ENOENT`;
            fs.readFile.mockRejectedValue(error);

            await lockManager.checkLock();

            expect(console.log).toHaveBeenCalledWith(`Lock not acquired. Proceeding to acquire the lock.`);
        });

        it(`should exit if an error occurs reading the lock file`, async () => {
            const readError = new Error(`Mock read error`);
            fs.readFile.mockRejectedValue(readError);

            process.exit = jest.fn();

            await lockManager.checkLock();

            expect(console.error).toHaveBeenCalledWith(`Error reading lock file:`, readError.message);
            expect(process.exit).toHaveBeenCalledWith(1);
        });

        it(`should exit if the lock file contains an invalid PID`, async () => {
            fs.readFile.mockResolvedValue(`InvalidPID`);

            process.exit = jest.fn();

            await lockManager.checkLock();

            expect(console.error).toHaveBeenCalledWith(`Error: Invalid PID found in the lock file. Exiting.`);
            expect(process.exit).toHaveBeenCalledWith(1);
        }, 10000);

    });

    // Add more tests here for scenarios when the lock file does exist and the process is or is not running
});