const fs = require('fs');
const axios = require('axios');
const Listing = require('./models/listingModel');

const amenitiesList = [
  ["swimmingPool", "parking", "wifi", "garden", "lift"],
  ["swimmingPool", "parking", "wifi", "garden"],
  ["swimmingPool", "parking", "wifi"],
  ["swimmingPool", "parking"],
  ["parking", "wifi"],
];

const titles = [
  "Modern Apartment",
  "Luxury Condo",
  "Cozy Bungalow",
  "Spacious Villa",
  "Urban Loft"
];

const addresses = [
  "5678 Main St",
  "9876 Elm St",
  "1234 Maple St",
  "4321 Oak St",
  "6789 Pine St"
];

const contact = [
  "Alice Smith",
  "Bob Johnson",
  "Charlie Brown",
  "Daisy Duke",
  "Eve Adams"
];

const listings = [];


(async () => {
  for (let i = 100; i < 325; i++) {
    const listing = new Listing({
      title: titles[i % titles.length],
      type: "flats",
      area: 120,
      address: addresses[i % addresses.length],
      bedrooms: (i % 5) + 1,
      bathrooms: (i % 3) + 1,
      amenities: amenitiesList[i % amenitiesList.length],
      description: "A beautiful property.",
      price: (i % 100) * 1000,
      contact: contact[i%5]+1,
      contactNumber: `12345678${i % 10}`,
      sellerId: '60a71eb774abf62504f0a12c', 
    });

    const image = `https://github.com/emanhamed/Houses-dataset/raw/master/Houses%20Dataset/${i}_frontal.jpg`;
    listing.image =image;
    await listing.save()
    listings.push(listing);
  }

  fs.writeFileSync('listings.json', JSON.stringify(listings, null, 2));
  
  console.log('Listings JSON generated!');
})();


