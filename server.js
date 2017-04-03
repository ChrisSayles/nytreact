var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Article = require('./models/articles.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(express.static('./public'));


// Establish connection with database
// mongoose.connect('mongodb://localhost/nytreact');
mongoose.connect('mongodb://heroku_j438z0bc:9n4277n07uqc047groqsafqb66@ds019796.mlab.com:19796/heroku_j438z0bc');
var db = mongoose.connection;


db.on('error', function(err){
	console.log("Mongoose Error", err);
});

db.once('open', function(){
	console.log("Mongoose connection successful.");
});



app.get('/', function(req,res){
	res.sendFile('./public/index.html');
});



app.get('/api/', function(req,res){
  Article.find({})
    .exec(function(err,doc){
      if (err){
        console.log(err);
      }else{
        res.send(doc);
      }
    })
});


app.post('/api/', function(req, res){
  // var newSearch = new Article(req.body);
  // console.log("BODY: " + req.body);

  Article.create({"title": req.body.headline.main, "url": req.body.web_url,"date": Date.now()}, function(err){
  	if(err){
  		console.log(err);
  	}else{
  		console.log("saved the search!");
  	}
  })
});


app.listen(PORT, function(){
	console.log("Listening on port: " +  PORT);
})
