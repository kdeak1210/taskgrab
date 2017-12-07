const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Mongoose
mongoose.connect(process.env.MONGO_URL, {useMongoClient: true}, (err) => {
  if (err){
    console.log(`MONGO CONNECTION FAILURE: ${err}`)
    return
  }
  console.log('Connected to MONGODB')
})

// Middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Routes
app.use('/', require('./routes/index'))
app.use('/api', require('./routes/api'))

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})