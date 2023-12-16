<p align="center">
  <img src="https://github.com/varaprasadreddy9676/node-locksmith/blob/main/logo/node-locksmith.png?raw=true" alt="node-locksmith Logo"/>
</p>

<h1 align="center">Node Locksmith</h1>

<p align="center">
Lock Your Node.js App Into Single-Instance Mode with Ease!
</p>

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
// Import the LockManager class
const LockManager = require('node-locksmith');

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

| Option             | Description                                                    | Default                    |
| ------------------ | -------------------------------------------------------------- | -------------------------- |
| lockFileName       | Name of your lock file.                                        | 'app.lock'                 |
| lockFileDir        | Directory for the lock file.                                   | \_\_dirname (your app dir) |
| killTimeout        | Time to wait before terminating previous instance (in ms).     | 5000                       |
| waitForExitTimeout | Time to wait for the old instance to exit (in ms).             | 10000                      |
| checkInterval      | Interval to check if the previous instance has exited (in ms). | 500                        |
| maxRetries         | How many times to retry lock acquisition.                      | 3                          |

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

### 📣 Feedback and Contribution

Your feedback and contributions are welcome! Please submit issues or pull requests on our GitHub repository.
https://github.com/varaprasadreddy9676/node-locksmith

Interested in contributing? We welcome pull requests! Let's make Node Locksmith better, together.

### 📜 License

Node Locksmith is MIT licensed, so feel free to use it in your projects.

—

Give Node Locksmith a try, and say goodbye to running multiple instances by accident!
