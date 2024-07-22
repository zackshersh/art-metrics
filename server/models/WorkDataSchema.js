const { Schema } = require("mongoose");

// seperate subschema holding all of the work's metadata and url
// what is sent to the user so that user isn't sent the metrics history for each
const workDataSchema = new Schema({
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
        
    }
})

module.exports = workDataSchema;