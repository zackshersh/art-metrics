const { Schema, model } = require("mongoose");
const metricSchema = require("./MetricSchema");
const workDataSchema = require("./WorkDataSchema");

const artworkSchema = new Schema({
    // work_data: {
    //     type: workDataSchema,
    //     default: {}
    // },
    // metrics: {
    //     type: metricsSchema,
    //     default: {}
    // }
    work_data: {
        title: {
            type: String,
            required: true,
            unique: false
        },
        artist: {
            type: String,
            required: false,
            unique: false
        },
        img_url: {
            type: String,   
        },
        date: {
            type: String
        },
        origin: {
            type: String
        },
        link: {
            type: String
        }
    },
    metrics: {
        boba_kiki: {
            type: metricSchema,
            default: {}
        },
        fresh_smelly: {
            type: metricSchema,
            default: {}
        },
        sleepy_amped: {
            type: metricSchema,
            default: {}
        }
    }
})


const Artwork = model("Artwork", artworkSchema);

module.exports = Artwork;