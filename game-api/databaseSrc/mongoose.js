// Path name to dotenv file
var str = __dirname + "\\.env";
require('dotenv').config({ path: str });
const mongoose = require('mongoose');

/**
 * Establish connection to the MongoDB Database cluster
 */
const connectDB = async () => {
  try {
    console.log(process.env.DATABASE_URI);
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
