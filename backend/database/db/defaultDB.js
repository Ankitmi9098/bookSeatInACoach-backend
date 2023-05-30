const mongoose = require("mongoose");
const Seat = require("../models/seats");

const setUpDatabase = async () => {
  Seat.deleteMany();
  //first 11 rows will have Seven Seats each
  //initializing first 11 row
  for (let row = 1; row <= 11; row++) {
    for (let seat = 1; seat <= 7; seat++) {
      let seatDetails = {
        _id: new mongoose.Types.ObjectId(),
        rowNumber: row,
        seatNumber: 7 * (row - 1) + seat,
      };
      await new Seat(seatDetails).save();
    }
  }

  //last row will have 3 seats
  //setting up last row
  for(let seat = 1; seat<=3; seat++){
    let seatDetails = {
        _id: new mongoose.Types.ObjectId(),
        rowNumber: 12,
        seatNumber: 77 + seat,
      };
      await new Seat(seatDetails).save();
  }
};

setUpDatabase();
