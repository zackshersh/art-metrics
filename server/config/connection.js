const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/artmetrics', {});

module.exports = mongoose.connection;