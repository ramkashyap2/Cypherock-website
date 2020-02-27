const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const SimpleNodeLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'mylogfile.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = SimpleNodeLogger.createSimpleLogger(opts)

require('dotenv').config()

const app = express()

// var config = require('./config')
const path = require('path')

app.use(express.static(path.join(__dirname, 'static')))

// body parser middleware comment
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/subscribe', (req, res) => {
  const origin = req.headers.origin
  if (
    origin != 'https://www.cypherock.com' &&
    origin != 'http://www.cypherock.com' &&
    origin != 'http://13.234.33.40' &&
    origin != 'https://cypherock.com' &&
    origin != 'http://cypherock.com' &&
    process.env.ENV != 'development'
  ) {
    log.error(origin)
    res.send(401)
  }
  console.log(origin)
  // res.send(401)
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: process.env.SENDGRID_API_KEY
  }
  var data = JSON.stringify({ contacts: [{ email: req.body.email }] })
  axios
    .put(`https://api.sendgrid.com/v3/marketing/contacts`, data)
    .then(data => {
      log.info(data.status + ' ' + data.statusText)
      res.send('OK')
    })
    .catch(err => {
      log.error(err)
      log.info(req.body.email)
      res.send('err')
    })
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'))
})
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'))
})
app.get('/backup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'backup.html'))
})
app.get('/faq.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'faq.html'))
})
app.get('/features.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'features.html'))
})
app.get('/privacypolicy.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'privacypolicy.html'))
})
app.get('/security.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'security.html'))
})
app.get('/vision.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'vision.html'))
})
app.get('/wallet.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'wallet.html'))
})

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'index.html'))
})
app.get('/backup', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'backup.html'))
})
app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'faq.html'))
})
app.get('/features', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'features.html'))
})
app.get('/privacypolicy', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'privacypolicy.html'))
})
app.get('/security', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'security.html'))
})
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'vision.html'))
})
app.get('/wallet', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', 'wallet.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'html', '404.html'))
})

var port = process.env.PORT || 5000

app.listen(port, () => {
  log.info(`server started at port ${port} webhook test 4`)
})
