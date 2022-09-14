require('dotenv').config();
const mongoose = require('mongoose');


/**
 * Establish connection to the MongoDB Database cluster 
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
