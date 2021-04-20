const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./src/db/db");
const app = express();
const port = process.env.PORT || 7000;

//database connection
connectDB();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Routes
const studentRouter = require("./src/routers/studentRouter");
const authRouter=require("./src/routers/authRouter");
const student = require("./src/models/student");
const teacherRouter = require("./src/routers/teacherRouter");

app.use("/api",authRouter)
app.use("/api",studentRouter)
app.use("/api",teacherRouter)


// app.get("/", (req, res) => {
//   res.send("Home");
// });

app.listen(port, () => {
  console.log("server is running on port " + port);
});

