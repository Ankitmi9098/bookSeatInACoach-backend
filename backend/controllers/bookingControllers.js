const Seats = require("../database/models/seats");
const { findSeats } = require("../helper/findSeats");

//get all seat details
const getSeatDetails = async (req, res) => {
  try {
    const seatsDetails = await Seats.find({});
    if (seatsDetails) {
      return res.status(200).send(seatsDetails);
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

//get count of total available seats
const countAvailableSeats = async (req, res) => {
  try {
    const availableSeats = await Seats.find({ isBooked: false });
    return res.status(200).send({ count: availableSeats.length });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

//Book Seats
const bookSeats = async (req, res) => {
  try {
    const numberOfSeats = req.body.seats;
    const bookedSeat = await findSeats(numberOfSeats);
    return res.status(200).send({ status: "booked", seats: bookedSeat });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
module.exports = {
  getSeatDetails,
  countAvailableSeats,
  bookSeats,
};
