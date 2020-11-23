const express = require("express");
const studentRouter = require("./routers/studentRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(studentRouter);
app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
