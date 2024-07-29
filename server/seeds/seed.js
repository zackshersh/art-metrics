
const db = require('../config/connection');
const { Artwork } = require("../models");

const artData = require("./artData.json");

db.once('open', async () => {
    await Artwork.deleteMany({});

    console.log(artData);
    const artworks = await Artwork.insertMany(artData);

    console.log("Seeded!");
    process.exit(0)
})