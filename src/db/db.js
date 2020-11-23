const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/vrLab", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection
  .once("open", () => console.log("connection has been made"))
  .on("error", (err) => console.log("error is : " + err));
