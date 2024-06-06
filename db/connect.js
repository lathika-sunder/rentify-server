const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const DB_URI =process.env.DB_URI;

mongoose.connect(DB_URI
);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connected to Mongodb");
});

module.exports = {
  connection,
};
