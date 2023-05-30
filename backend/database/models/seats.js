const mongoose = require("mongoose");

//setting up seat schema
const seatSchema = new mongoose.Schema({
  rowNumber: {
    type: Number,
  },
  seatNumber: {
    type: Number,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

//Setting up  Model
const Seats = new mongoose.model("Seat", seatSchema);

//exporting Model
module.exports = Seats;
