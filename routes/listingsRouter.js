const {
  createListing,
  getListings,
  getSellerListings,
  getListingsPerPage,
  postLike,
  getEnquiries,
} = require("../controllers/listingsController");
const verifyToken = require("../middlewares/verifyToken");
const { uploadImage } = require("../utils/postImageUtil");

const router = require("express").Router();

router.post("/postListing", uploadImage, verifyToken, createListing);
router.get("/getListings", getListings);
router.get("/getListingsPerPage", getListingsPerPage);
router.get("/getSellerListings", verifyToken, getSellerListings);

router.post("/postLike", verifyToken, postLike);
router.get("/getEnquiries", verifyToken, getEnquiries);

module.exports = router;
