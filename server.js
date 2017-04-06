//required dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


//------------------Set up of our MongoDB configuration----------------------------
mongoose.connect("mongodb://localhost/nytreact");

// Establish connection with database

var db = mongoose.connection;

//if there is an error connecting to DB console.log the error
db.on('error', function(err){
  console.log("Mongoose Error", err);
});
//if connection successful console.log "connetion successful"
db.once('open', function(){
  console.log("Mongoose connection successful.");
});

//---------------------Required Schema-----------------------------------------------
var Article = require('./models/articles.js');

//---------------------Express Server Setup -----------------------------------------
var app = express();
var PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(express.static('./public'));



//------------------------------------Routes------------------------------------------


//---------Route to the main page AKA Index-------------------------------
app.get('/', function(req,res){
	res.sendFile('./public/index.html');
});


//--------Route that will get our saved articles---------------------------
app.get('/api/saved', function(req,res){
  Article.find({})
  .exec(function(err,doc){
    if(err){
      console.log(err);
    }
    else{
      res.send(doc.id);
    }
  });
});

//--------Route that will be used to add an article to our saved list-------
app.post('/api/saved', function(req, res){

  var newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });

});



app.listen(PORT, function(){
	console.log("Listening on port: " +  PORT);
})
