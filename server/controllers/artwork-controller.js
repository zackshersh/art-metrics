const { Artwork } = require("../models");
const db = require('../config/connection');

const { updateMetrics } = require("./analytics-controllers")

module.exports = {
    async getAllArtworks(req, res) {
        const allArtworks = await Artwork.find({});

        if(!allArtworks) {
            return res.status(400).json({message: 'No Artworks Found'});
        }

        res.status(200).json(allArtworks);
    },

    async getRandomArtwork(req, res) {
        const rndm = await Artwork.aggregate().sample(1);
        console.log(rndm)
    },

    async getArtwork({ params }, res) {
        const work = await Artwork.findById(params.id);
        console.log(work)

        res.status(200).json(work);
    },


    async submitRatings({ body }, res) {
        console.log("---------")
        console.log("\x1b[33m","Ratings Submitted for Piece","\x1b[37m");
        console.log(body);
        console.log("---------")
        
        function pushNewValueToMetric(doc, metricName, value){
            doc.metrics[metricName].valueHistory.push(value);
            return doc;
        }

        let artworkDoc = await Artwork.findById(body._id);

        for (const [key, value] of Object.entries(body)){
            if(key == "_id") continue;
            let valueParsed = parseFloat(value);
            let doc = pushNewValueToMetric(artworkDoc, key, valueParsed);
            artworkDoc = doc;
        }
        artworkDoc.save().then(() => {
            updateMetrics(artworkDoc);
        });


        res.status(200);
    },



}