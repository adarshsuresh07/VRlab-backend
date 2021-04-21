const mongoose = require("mongoose");
const keys = require("../config/keys")

require('dotenv').config()

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const connectDB = async () => {
  await mongoose
    .connect(keys.mongoURI, connectionParams)
    .then(() => {
      console.log("Connected to database ");

    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};

module.exports = connectDB;
