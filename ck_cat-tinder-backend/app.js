var express = require('express');
var bodyParser = require('body-parser')
var Cat = require('./models').Cat
var cors = require('cors')

const corsOptions = { origin: 'http://localhost:3000' }
var app = express();

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.json({message: 'API Example App'})
});

app.get('/cats', function(request, response){
  Cat.findAll().then(function(cats){
    response.status(200)
    response.json({status: 'success', cats: cats})
  })
})

app.post('/create_cat', function(request, response){
  console.log(request.body)
  let catParams = request.body.cat
  Cat.create(catParams).then(function(cat){
    response.status(200)
    console.log("success", cat);
    response.json({status:'success', cat:cat})
  }).catch(function(err){
    response.status(400)
    console.log("fail", err)
    response.json({status:'error', error:err})
  })
})

app.listen(4000, function () {
 console.log('This is listening on port 4000!');
});
