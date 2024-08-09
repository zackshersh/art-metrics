const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/artmetrics', {});
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://zackshersh:clusterofoats@artmetricscluster.ubhzb.mongodb.net/?retryWrites=true&w=majority&appName=ArtMetricsCluster', {});

module.exports = mongoose.connection;