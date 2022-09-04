const express = require('express')
// dotenv so we can have env variables
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()
  
// body parser for json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// when call is sent to api/, let the file specified handle it
// app.use('/api/', require('./routes/'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))