const express = require("express");
const studentRouter = require("./src/routers/studentRouter");
const connectDB = require("./src/db/db");
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(studentRouter);
app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
