var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('.'))

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/upload', function (req, res) {
  console.log(req.body.files)
  for (var i; i < 10000; i++) {
    console.log(i)
  }
  res.json({result: 'os minino'})
})

var port = process.env.PORT || 5000

app.listen(port, function (err) {
  console.log('server running on port ' + port)
  if (err) console.log(err)
})
