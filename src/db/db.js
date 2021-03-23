const mongoose = require("mongoose");

const URI =
  "mongodb+srv://ajayduth:mEIJrpVmI2tDrvjf@demo-rest-api.lowta.mongodb.net/vrlab?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const connectDB = async () => {
  await mongoose
    .connect(URI, connectionParams)
    .then(() => {
      console.log("Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
};

module.exports = connectDB;
