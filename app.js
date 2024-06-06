const express = require("express");
const app = express();
const router = express.Router();
const usersRouter = require("./routes/usersRouter");
const listingsRouter=require('./routes/listingsRouter')
const dotenv = require("dotenv");
const cors = require("cors");
const { connection } = require("./db/connect");

dotenv.config();
app.use(cors());
app.use(express.json()); 

app.get('/api/v1/rentify', (request, response) => {
  response.send("Welcome to Rentify API :)");
});

app.use('/api/v1/rentify/users', usersRouter);
app.use('/api/v1/rentify/listings', listingsRouter);
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App running on PORT", PORT);
});
