const { Schema, model } = require("mongoose");

// holds all data associated with a single metric
const metricSchema = new Schema({
    valueHistory: {
        type: Array,
        default: []
    },
    mean: {
        type: Number,
        default: 0
    },
    standard_dev: {
        type: Number,
        default: 0
    }

})



module.exports = metricSchema;
