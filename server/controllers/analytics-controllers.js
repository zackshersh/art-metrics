const { avg, standardDeviation } = require("../scripts/utils")

// controllers for internally recalculating stats
    // not interacted with by users directly
module.exports = {
    async updateMetrics(artworkDoc){
        // console.log(artworkDoc)

        for (const [metric, data] of Object.entries(artworkDoc.metrics)){

            let mean = avg(data.valueHistory);
            data.mean = mean.toFixed(4);

            data.standard_dev = standardDeviation(data.valueHistory);
        }

        // console.log(artworkDoc)
        artworkDoc.save();
    }
}