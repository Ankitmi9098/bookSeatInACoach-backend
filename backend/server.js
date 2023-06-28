const dotenv = require("dotenv").config();
const express = require("express");
const cron = require("node-cron");

require("./database/db/connectDB");
const bookingRoute = require("./Routers/bookingsRoute");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use(express.json());
app.use(bookingRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// to keep website running
cron.schedule("*/10 * * * *", () => {
  // console.log("Cron job is executing");
  var exec = require("child_process").exec;
  exec("ping book-seats-in-a-coach-app.onrender.com", function (err, stdout, stderr) {
    // console.log(stdout);
  });
});
