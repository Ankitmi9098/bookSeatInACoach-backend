const express = require("express");
const Seats = require("../database/models/seats");
const {
  getSeatDetails,
  countAvailableSeats,
  bookSeats,
} = require("../controllers/bookingControllers");

const bookingRoute = new express.Router();

//Get all seat details
bookingRoute.get("/bookings/getSeatDetails", getSeatDetails);

//Get count of available seats
bookingRoute.get("/bookings/countAvailableSeats", countAvailableSeats);

//Book Seats
bookingRoute.patch("/bookings/bookSeats", bookSeats);

module.exports = bookingRoute;
