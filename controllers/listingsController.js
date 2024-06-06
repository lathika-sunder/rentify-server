const { Like } = require("../models/like");
const Listing = require("../models/listingModel");
const { User } = require("../models/usersModel");
const { saveImage, uploadImage } = require("../utils/postImageUtil");

const createListing = async (request, response) => {
  
  try {
    const {
      title,
      type,
      area,
      address,
      bedrooms,
      bathrooms,
      amenities,
      description,
      price,
      contact,
      contactNumber,
    } = request.body;

    const image=request.file.path
    const newListing = new Listing({
      title,
      type,
      area,
      address,
      bedrooms,
      bathrooms,
      amenities,
      image,
      description,
      price,
      contact,
      contactNumber,
      sellerId:request.user.id,
    });

    await newListing.save();
    response
      .status(201)
      .json({ message: "Listing created successfully", listing: newListing });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error creating listing", error: error.message });

      
  }
};

const getListings = async (request, response) => {

  try {
    const listings = await Listing.find();
    response.status(200).json(listings);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error getting listings", error: error.message });
  }
};

const getListingsPerPage = async (request, response) => {
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit); 

  try {
    const listings = await Listing.find()
      .skip((page - 1) * limit)
      .limit(limit); 

    response.status(200).json(listings);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error getting listings", error: error.message });
  }
};

const getSellerListings = async (request, response) => {
  const sellerId = request.user.id;

  try {
    const listings = await Listing.find({ sellerId: sellerId });
    response.status(200).json(listings);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error getting listings", error: error.message });
  }
};

const postLike=async (req, res) => {
  const { listingId } = req.body;

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    const existingLike = await Like.findOne({
      user: req.user.id,
      listing: listingId,
    });

    if (existingLike) {
      return res.status(400).json({ msg: 'Listing already liked' });
    }

    const like = new Like({
      user: req.user.id,
      listing: listingId,
    });

    await like.save();

    res.json(like);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getEnquiries = async (req, res) => {
  const userId = req.user.id;

  try {
    const listingsOfSeller = await Listing.find({ sellerId: userId });

    const listingIds = listingsOfSeller.map((listing) => listing._id);
    const likes = await Like.find({ listing: { $in: listingIds } });

    const userIds = likes.map((like) => like.user);

    const userDetails = await User.find({ _id: { $in: userIds } });

    const result = likes.map((like) => {
      const listing = listingsOfSeller.find((listing) => listing._id.equals(like.listing));
      const user = userDetails.find((user) => user._id.equals(like.user));

      return {
        propertyId: like.listing,
        propertyTitle: listing ? listing.title : "Unknown",
        buyerName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
        contact: user ? user.phone : "Unknown",
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};



module.exports = { createListing, getListings, getSellerListings, getListingsPerPage, postLike,getEnquiries };
