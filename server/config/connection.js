const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/artmetrics', {});

// TO SEED DATABASE MANUALLY ON MONGODB ATLAS, PASTE MONGO URI IN _______
// mongoose.connect(process.env.MONGO_URI || '_____', {});

module.exports = mongoose.connection;