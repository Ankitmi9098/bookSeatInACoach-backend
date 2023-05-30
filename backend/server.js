const dotenv = require("dotenv").config()
const express = require("express");

require("./database/db/connectDB");
const bookingRoute = require("./Routers/bookingsRoute");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: process.env.ORIGIN
}))

app.use(express.json());
app.use(bookingRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
