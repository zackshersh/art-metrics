const router = require('express').Router();
const {
    getAllArtworks,
    getRandomArtwork,
    getArtwork,
    submitRatings
} = require("../../controllers/artwork-controller");

router.route('/').get(getAllArtworks);
router.route('/random').get(getRandomArtwork);
router.route('/:id').get(getArtwork);
router.route('/:id').post(submitRatings)

module.exports = router;