const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
