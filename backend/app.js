const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3500;
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/db");
const path = require("path");

//mongoose
// Test with: 'mongodb://127.0.0.1:27017' for Ramya
// Uncomment below 3 lines to test using local DB
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('connected,,'))
//   .catch((err) => console.log(err));

connectDB();

//BodyParser
app.use(bodyParser.json()); //Handles JSON requests
app.use(bodyParser.urlencoded({ extended: false })); //Handles normal post requests

//middleware for cookie
app.use(cookieParser());

//cors for listenning from different port
app.use(cors(corsOptions));

//Routes
app.use("/users", require("./routes/users"));

app.use("/recipe", require("./routes/recipe"));

app.use("/admin", require("./routes/admin"));

//verify token first
if (process.env.NODE_ENV === "production") {
  console.log("in production");
  app.use(
    express.static(path.resolve(path.join(__dirname, "..", "/frontend/build")))
  );
  app.get("*", (req, res) => {
    console.log("sending file");
    res.sendFile(
      path.resolve(path.join(__dirname, "..", "/frontend/build/index.html"))
    );
  });
}
//app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, function () {
  console.log("server is listening on port: " + PORT);
});
