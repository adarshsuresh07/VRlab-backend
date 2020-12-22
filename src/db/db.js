const mongoose = require("mongoose");

const URI =
  "mongodb+srv://VRLab:VRLab@cluster0.rbfvi.mongodb.net/VRLab?retryWrites=true&w=majority";

// mongoose.connect("mongodb://127.0.0.1:27017/vrLab", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log("db connected");
};

// mongoose.connection
//   .once("open", () => console.log("connection has been made"))
//   .on("error", (err) => console.log("error is : " + err));

module.exports = connectDB;
