const express = require("express");
const bodyParser = require("body-parser")
const connectDB = require("./src/db/db");
const keys = require("./src/config/keys")

const app = express();
const port = keys.port || 7000;
const cors = require('cors');
//database connection
connectDB();




// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Cors acces controll public

app.use(cors({origin: '*'}));


//Routes
const studentRouter = require("./src/routers/studentRouter");
const authRouter=require("./src/routers/authRouter");
const teacherRouter = require("./src/routers/teacherRouter");

app.use("/api",authRouter)
app.use("/api",studentRouter)
app.use("/api",teacherRouter)





app.listen(port, () => {
  console.log("server is running on port " + port);
});

