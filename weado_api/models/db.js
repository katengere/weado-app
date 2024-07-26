const mongoose = require('mongoose');
const readline = require('readline');


mongoose.connection.on('error', () => {
    console.log('mongoose connection error');
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected');
});

// capturing process termination events

if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}
// reusable function to close mongoose connection
function gracefulShutdown(msg, callback) {
    mongoose.connection.close().then(
        (success) => {
            console.log(`mongoose disconnected through ${msg}`);
            callback();
        },
        err => console.log('Error closing mongodb connection ', err)
    );
}

// capture signal event for nodemon restart 
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// capture signal event for app termination
process.on('SIGINT', () => {
    gracefulShutdown('application termination', () => {
        process.exit(0);
    });
});

// capture signal event for heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./projects');
require('./messages');