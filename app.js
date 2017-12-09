const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const sessions = require('client-sessions')
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
app.use(cookieParser())
app.use(sessions({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 24*60*60*1000, // 1 day
  activeDuration: 30*60*1000
}))
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Routes
app.use('/', require('./routes/index'))
app.use('/api', require('./routes/api'))
app.use('/twilio', require('./routes/twilio'))
app.use('/account', require('./routes/account'))

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})