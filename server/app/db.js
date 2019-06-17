const mongoose = require('mongoose');
const mongoDB = "mongodb://host.docker.internal:27017/mydb";

mongoose.connect(mongoDB, { useNewUrlParser: true });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + mongoDB);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

// Controlled shutdown
function gracefulShutdown(signal) {
    console.log('Detected shutdown / restart.')
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected through app termination');
        process.kill(process.pid, signal);
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('SIGUSR2');
});

process.once('SIGINT', () => {
    gracefulShutdown('SIGINT');
});