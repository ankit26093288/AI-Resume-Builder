const mongoose = require("mongoose");

const connectDB = async () => {

  console.log("Starting MongoDB Connection...");

  console.log("Mongo URI:");
  console.log(process.env.MONGO_URI);

  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

    console.log("Host:", conn.connection.host);

  } catch (error) {

    console.log("MongoDB Connection Error");

    console.log(error);

  }

};

module.exports = connectDB;