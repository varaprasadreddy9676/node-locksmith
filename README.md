# Node Locksmith

<p align=“center”>
  <img src=“https://github.com/varaprasadreddy9676/node-locksmith/blob/main/logo/node-locksmith.png?raw=true
 alt=“node-locksmith Logo” width=“200”/>
</p>

<h1 align=“center”>Node Locksmith</h1>

<p align=“center”>
Lock Your Node.js App Into Single-Instance Mode with Ease!
</p>

## Lock Your Node.js App Into Single-Instance Mode with Ease!

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

// Import the LockManager class
const LockManager = require('node-locksmith');

// Create a new instance with optional custom settings
const lockManager = new LockManager({
lockFileName: 'myApp.lock' // Customize your lock file name
});

async function main() {
// Check and create a lock before running your app logic
await lockManager.checkLock();
await lockManager.createLock();

    // Your app logic goes here

    // When all done, cleanup by removing the lock
    await lockManager.removeLock();

}

// Start your app with LockManager in control
main();

And voilà – you're now running with a robust single-instance lock!

### 🛠 Configuration

Node Locksmith is flexible. Configure as little or as much as you like:

Option | Description | Default
— | — | —
lockFileName | Name of your lock file. | 'app.lock'
lockFileDir | Directory for the lock file. | \_\_dirname (your app's directory)
killTimeout | Time to wait before forcefully terminating the previous instance (in ms). | 5000
waitForExitTimeout | Time to wait for the old instance to exit (in ms). | 10000
checkInterval | Interval to check whether the previous instance has exited (in ms). | 500
maxRetries | How many times to retry lock acquisition. | 3

### 📚 Usage Guide & Examples

Please check our full documentation and examples to explore all the capabilities that Node Locksmith can bring to your Node.js projects.

### 📈 Keep It Up-to-Date

Node Locksmith uses semantic versioning. To ensure you have the latest improvements and fixes, keep it updated using npm:

npm update node-locksmith

### 📣 Feedback and Contribution

We love to hear from you! If you have any feedback, issues, or suggestions for Node Locksmith, please open an issue on our repository.

Interested in contributing? We welcome pull requests! Let's make Node Locksmith better, together.

### 📜 License

Node Locksmith is MIT licensed, so feel free to use it in your projects.

—

Give Node Locksmith a try, and say goodbye to running multiple instances by accident!
