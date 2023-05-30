const Seats = require("../database/models/seats");

const findSeats = async (numberOfSeats) => {
//   console.log("Numbers of seats to be booked: " + numberOfSeats);
  const availSeats = await Seats.find({ isBooked: false });
  const availSeatsInEachRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let seatsBooked = [];

  //adding total number of available seats in each row in availSeatsInEachRow array
  availSeats.forEach((seat) => {
    availSeatsInEachRow[seat.rowNumber - 1] += 1;
  });
  //   //printing array
  //   console.log("Available seats array ", availSeatsInEachRow);
  //   availSeatsInEachRow.forEach((seats) => {
  //     console.log(seats + " "); //storing the available seats in reverse order
  //   });

  //   if (numberOfSeats <= availSeatsInEachRow[11]) {
  //     console.log("running if block to fill seats of last row");
  //     const bookedSeats = await bookSeatInRow(12, numberOfSeats);
  //     seatsBooked = bookedSeats;
  //     return seatsBooked;
  //   }

  var startRow = -1,
    endRow = -1,
    minLength = 13,
    totalRows = 12;
  var currSum = 0,
    start = 0,
    end = 0;

  //logic to find seats
  //   console.log("Starting the business logic");
  while (end < totalRows) {
    while (currSum < numberOfSeats && end < totalRows) {
      currSum += availSeatsInEachRow[end];
      end++;
    }

    while (currSum >= numberOfSeats && start < totalRows) {
      if (end - start < minLength) {
        startRow = start;
        endRow = end;
        minLength = end - start;
      }
      currSum -= availSeatsInEachRow[start];
      start++;
    }
  }
  //    console.log(
  //     "End of the business logic ",
  //     "start row ",
  //     startRow,
  //     "end row ",
  //     endRow,
  //     "min length ",
  //     minLength
  //   );

  for (let row = startRow; row < endRow; row++) {
    if (availSeatsInEachRow[row] <= numberOfSeats) {
      //   console.log(
      //     "available seat is less than number of seats ",
      //     availSeatsInEachRow[row],
      //     " ",
      //     numberOfSeats
      //   );
      const bookedSeats = await bookSeatInRow(row, availSeatsInEachRow[row]);
      numberOfSeats -= availSeatsInEachRow[row];
      //   console.log("Booked Seats ", bookedSeats);
      seatsBooked = [...seatsBooked, ...bookedSeats];
    } else if (numberOfSeats < availSeatsInEachRow[row]) {
      //   console.log(
      //     "available seat is greater than number of seats ",
      //     availSeatsInEachRow[row],
      //     " ",
      //     numberOfSeats
      //   );
      const bookedSeats = await bookSeatInRow(row, numberOfSeats);
      numberOfSeats = 0;
      //   console.log("Booked Seats ", bookedSeats);
      seatsBooked = [...seatsBooked, ...bookedSeats];
    }
  }
  //   console.log("Seat Booked ", seatsBooked);
  return seatsBooked;
};

const bookSeatInRow = async (rowNumber, numSeats) => {
  //   console.log(
  //     "bookedSeatsinaRow RowNumber ",
  //     rowNumber,
  //     "Number of Seats ",
  //     numSeats
  //   );
  const bookedSeats = [];
  const seatsDetails = await Seats.find({
    rowNumber: parseInt(rowNumber) + 1,
    isBooked: false,
  });
  //   console.log("Seat Details", seatsDetails);
  seatsDetails.forEach((seat) => {
    // console.log("Seat Number ", seat.seatNumber);
    if (numSeats > 0) {
      updateBookedStatusInDB(seat._id);
      bookedSeats.push(seat.seatNumber);
      numSeats--;
    }
  });
  return bookedSeats;
};

const updateBookedStatusInDB = async (seatId) => {
  //   console.log("update booked status SeatId ", seatId);
  await Seats.findByIdAndUpdate(seatId, { isBooked: true });
};

module.exports = { findSeats };
