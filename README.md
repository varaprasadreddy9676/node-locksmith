<p align="center">
  <img src="https://github.com/varaprasadreddy9676/node-locksmith/blob/main/logo/node-locksmith.png?raw=true" alt="node-locksmith Logo"/>
</p>

<h1 align="center">Node Locksmith</h1>

<p align="center">
Lock Your Node.js App Into Single-Instance Mode with Ease!
</p>

Certainly! Here's the table of contents for your README:

1. [Introduction](#introduction)

   - [Node Locksmith](#node-locksmith)
   - [Features](#features)

2. [Installation](#installation)

   - [npm Install](#npm-install)

3. [Quick Start](#quick-start)

   - [Usage Example](#usage-example)

4. [Configuration](#configuration)

   - [Options](#options)

5. [Robust Exception Handling & Real-Life Scenarios](#robust-exception-handling--real-life-scenarios)

   - [Exceptional Reliability](#exceptional-reliability-in-every-scenario)
   - [Beyond Exception Handling](#beyond-exception-handling-the-peace-of-mind-guarantee)

6. [Keep It Up-to-Date](#keep-it-up-to-date)

   - [Semantic Versioning](#semantic-versioning)

7. [Dependencies](#dependencies)

   - [Third-Party Libraries](#third-party-libraries)

8. [Troubleshooting](#troubleshooting)

   - [Lock File Issues](#1-lock-file-issues)
   - [Permission Errors](#2-permission-errors)
   - [Concurrent Launch Failures](#3-concurrent-launch-failures)
   - [Signal Handling](#4-signal-handling)
   - [Failed to Exit Previous Instance](#5-failed-to-exit-previous-instance)
   - [Incorrect PID in Lock File](#6-incorrect-pid-in-lock-file)
   - [Delayed Lock Release on Exit](#7-delayed-lock-release-on-exit)
   - [Module Import Errors](#8-module-import-errors)
   - [Unexpected Behavior](#9-unexpected-behavior)

9. [Credits](#credits)

10. [Author](#author)

11. [Feedback and Contribution](#feedback-and-contribution)

12. [License](#license)

### 🚀 Introduction

Node Locksmith is an elegant and straightforward Node.js module that ensures your application runs as a single instance, preventing multiple executions that could lead to data corruption or unexpected behavior. Imagine a world where starting your app twice is impossible – that's the peace of mind Node Locksmith offers!

Whether you're managing batch jobs, cron tasks, or any other Node.js scripts, Node Locksmith keeps them unique so your system stays safe and predictable.

### 🌟 Features

- Effortless Integration: Just a few lines of code to make your app single-instance.
- Automatic Lock Management: Creates and releases locks without a fuss.
- Customizable Behaviors: Decide how your app responds to duplicate runs.
- Cross-Platform Support: Works on both Windows and Unix-like systems.
- Safe & Secure: Ensures only one instance manages crucial tasks at a time.

### 💻 Installation

Getting started with Node Locksmith is a snap! Run this command:

npm install node-locksmith

### 🚀 Quick Start

Here's how simple it is to use Node Locksmith:

```
// Import and initialize the LockManager class

const options = {
    lockFileName: 'medics_lab_interface_server.lock',
    killTimeout: 10000,            // Set the timeout for waiting before terminating previous instance (in ms) if its already running.
    waitForExitTimeout: 20000,    // Set the timeout for waiting for the old process to exit (milliseconds)
    checkInterval: 500,           // Set the interval for checking the status of the other process (milliseconds)
    maxRetries: 3,                // Set the maximum number of retries for acquiring the lock
    defaultAnswer: 'yes'          // Set the default answer for user prompts
}
const lockManager = new (require('node-locksmith'))(options).initializeTerminationHandlers();


// Create a new instance with optional custom settings
const lockManager = new LockManager({
lockFileName: 'myApp.lock' // Customize your lock file name
});

lockManager.initializeTerminationHandlers(); // Initializes termination event handlers for graceful application shutdown.

async function main() {
// Check and create a lock before running your app logic
await lockManager.checkLock();
await lockManager.createLock();

    // Your app logic goes here

}

// Start your app with LockManager in control
main();
```

And voilà – you're now running with a robust single-instance lock!

### 🛠 Configuration

Node Locksmith's configuration is both flexible and straightforward:

| Option             | Description                                                                          | Default                    |
| ------------------ | ------------------------------------------------------------------------------------ | -------------------------- |
| lockFileName       | Name of your lock file.                                                              | 'app.lock'                 |
| lockFileDir        | Directory for the lock file.                                                         | \_\_dirname (your app dir) |
| killTimeout        | (Already running process) Time to wait before terminating existing instance (in ms). | 5000                       |
| waitForExitTimeout | Time to wait for the old instance to exit (in ms).                                   | 10000                      |
| checkInterval      | Interval to check if the previous instance has exited (in ms).                       | 500                        |
| maxRetries         | How many times to retry lock acquisition.                                            | 3                          |

### 🛡️ Robust Exception Handling & Real-Life Scenarios

#### Exceptional Reliability in Every Scenario

We've accounted for an extensive range of scenarios in which your Node.js applications might operate, taking the heavy lifting of error handling off your shoulders. Here are some of the situations we've carefully tested and handled for you:

- Concurrent Launch Attempts: When multiple instances try to start simultaneously, Node Locksmith gracefully ensures only one takes control, while the rest are either terminated or remain uninitiated based on your configuration.

- Orphaned Lock Files: Sometimes applications crash or are terminated abruptly, leaving behind lock files without a running instance. Our module intelligently detects these orphaned locks, removes them, and allows your app to start cleanly.

- Permission Issues: In the event of lock files being created with the wrong permissions, Node Locksmith provides informative error messages and recovery suggestions, making it easier for you to rectify such issues without delving into confusing system errors.

- Process Termination: If an existing instance needs to be closed to allow a new one to start, our module handles SIGTERM signals to shut down the previous instance safely, ensuring data integrity and proper resource cleanup.

- Timeout and Retry Logic: Network file systems and other I/O operations can be unpredictable. Node Locksmith comes with a sophisticated timeout and retry mechanism that stands guard against transient issues, making sure your lock acquisition doesn't fail due to temporary glitches.

#### Beyond Exception Handling: The Peace of Mind Guarantee

- With Node Locksmith, you're not just getting a module but a promise of peace of mind.
- Once integrated, the module requires no manual intervention. You set it up once, and it runs as intended, every time.

### 📈 Keep It Up-to-Date

Node Locksmith uses semantic versioning. To ensure you have the latest improvements and fixes, keep it updated using npm:

npm update node-locksmith

### 📦 Dependencies

node-locksmith utilizes the following third-party libraries:

- ps-node: A process lookup utility for Node.js.

Make sure to check out their documentation for more details on how they work.

### Troubleshooting

Encountering issues can be a hiccup in developing great applications. If you run into any problems with node-locksmith, here are some common issues and their respective solutions.

#### 1. Lock File Issues

Issue: The lock file is not created where expected or is prematurely deleted.

Solution:

- Ensure the lockFileDir directory is writable by the application. If unspecified, process.cwd() is used by default.
- Check for external processes or scheduled clean-up jobs that might modify or delete files in the lock file directory.

#### 2. Permission Errors

Issue: Encountering permission errors when trying to create, write, or delete the lock file.

Solution:

- Review file system permissions and user ownership for the lock file directory.
- On Unix-like systems, consider proper permission management or running the process with elevated privileges (sudo) if appropriate.

#### 3. Concurrent Launch Failures

Issue: Multiple instances seem to bypass the lock mechanism, running simultaneously.

Solution:

- Modify checkInterval and maxRetries configuration parameters to give instances more time or attempts to acquire the lock.
- Double-check that the lock file path is consistent across instances and no instance-specific paths are being used.

#### 4. Signal Handling

Issue: Application doesn’t release the lock after receiving a termination signal.

Solution:

- Ensure lockManager.initializeTerminationHandlers() is called during application setup.
- Avoid overriding default signal handlers that may prevent node-locksmith from performing clean-up tasks.

#### 5. Failed to Exit Previous Instance

Issue: The application does not terminate the previous instance when requested.

Solution:

- The previous process may require more privileges to be terminated. Run the new instance with adequate permissions, or manually terminate the older one.
- Investigate whether the operating system’s process management settings are interfering with signal delivery.

#### 6. Incorrect PID in Lock File

Issue: The lock file contains an invalid or old PID, causing conflicts.

Solution:

- Ensure the application closes cleanly to update or remove the lock file.
- Add additional error handling to detect when the PID in the lock file does not correspond to a running process.

#### 7. Delayed Lock Release on Exit

Issue: The lock file remains after the application exits.

Solution:

- Confirm that clean-up code executes correctly and listen to the correct events for process termination.
- Look out for asynchronous operations that may delay the process’s exit and subsequently delay the lock release.

#### 8. Module Import Errors

Issue: TypeScript definitions are missing or not found, resulting in import errors.

Solution:

- If using TypeScript, ensure you’ve included type declarations for node-locksmith, or create a .d.ts file declaring module typings.
- Check that the module is installed correctly under node_modules and is not corrupted.

#### 9. Unexpected Behavior

Issue: Experiencing erratic behavior or errors that are not covered by the guide.

Solution:

- Check the Node.js version for compatibility issues; update Node.js or node-locksmith if necessary.
- Review the project’s GitHub issues for similar problems, or report a new issue with detailed information about the Node.js version, operating system, stack trace, and steps to reproduce the error.

For issues beyond these common scenarios, please open an issue on the node-locksmith GitHub repository with as much detail as possible. Our community is here to help!

### 📜 Credits

This module stands as a testament to the collective knowledge and inspiration drawn from significant figures who have played pivotal roles in shaping my professional journey. Gratitude is extended to:

- My CEO: For visionary leadership and unwavering support that has been instrumental in fostering my growth. His profound insights into the internals of software engineering, emphasis on principles of engineering like modularity, scalability and robustness, and the embodiment of a forward-thinking vision have been invaluable. The teachings and experiences derived from his mentorship have left an great mark on this me and significantly influenced my approach to software development.

- The Management Team & Colleagues: Providing invaluable guidance, encouragement, and the freedom to innovate, this team has been crucial to the development of this module.

- The Broader Open-Source Community: Acknowledgment to the tireless efforts of the open-source community, whose contributions to the Node.js ecosystem laid the foundation upon which this module stands.

I express deep gratitude for the collective wisdom and experiences shared by each individual mentioned above. Their influence has not only shaped this project but has also profoundly impacted my understanding of software development.

### ✍️ Author

- Sai varaprasad (https://github.com/varaprasadreddy9676) - Initial work - A passionate software engineer who enjoys turning complex problems into simple, beautiful, and intuitive solutions. When I’m not coding, evangelizing best practices, you can find me immersed in reading, exploring new technology.

### 📣 Feedback and Contribution

Your feedback and contributions are welcome! Please submit issues or pull requests on our GitHub repository.
https://github.com/varaprasadreddy9676/node-locksmith

Interested in contributing? We welcome pull requests! Let's make Node Locksmith better, together.

### 📜 License

Node Locksmith is MIT licensed, so feel free to use it in your projects.

—

Give Node Locksmith a try, and say goodbye to running multiple instances by accident!
