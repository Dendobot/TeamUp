const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const verifyJWT = require("./config/verifyJWT");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/db')


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


if(process.env.NODE_ENV === 'production') {
  console.log("in production")
  app.use(express.static('../frontend/build'))

  app.get("*", (req, res) => {
    console.log("sending file")
    res.sendFile("../frontend/build/index.html")
  })
}

//Routes
app.use('/users', require('./routes/users'));
//verify token before give access to route
app.use(verifyJWT);
app.use('/recipe', require('./routes/recipe'));


app.use('/admin', require('./routes/admin'));

//verify token first

//app.use('/dashboard', require('./routes/dashboard'));


app.listen(PORT, function () {
  console.log("server is listening on port: " + PORT);
});