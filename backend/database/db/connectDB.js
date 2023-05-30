const mongoose = require("mongoose");

// require('./defaultDB')

//connection to DB
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`Mongoose Connected to DB ${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB()
