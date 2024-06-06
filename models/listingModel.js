const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs=require('fs')
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['residential', 'commercial', "villa","house","flats"],
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  image:{
    type:String
  },
  amenities: {
    type: [],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});



const Listing = mongoose.model('Listing', listingSchema);


// fs.readFile('listings.json', 'utf8', async (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const listings = JSON.parse(data);
//   try{
//     await Listing.create(listings);
//     console.log("Listings Created")
//   }
//   catch(error)
//   {
//     console.log(error.message)
//   }
// });

module.exports = Listing;
