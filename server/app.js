var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');
// 27017 is default mongo port
mongoose.connect('localhost:27017/soloproject');

var ourSchema = new  mongoose.Schema({
  date: String,
  location: String,
  state: String,
  nameIn: String,
  classIn: String,
  twoStanding: Number,
  twoXS: Number,
  twoSitting: Number,
  twoXs: Number,
  threeProne: Number,
  threeX: Number,
  sixProne: Number,
  sixX: Number,
});
var ourOTC = mongoose.model( 'ourOTC', ourSchema );

app.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'));
});//End of base URL

app.get('/main', function (req, res) {
  res.sendFile(path.resolve('views/main.html'));
});//End fo /main function

app.get('/fMain', function (req, res) {
  res.sendFile(path.resolve('views/fMain.html'));
});//End of fMain function

app.get('/final', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/', 'final.html'));
});//End of final function

app.post('/getCompetitors', function (req, res) {
  ourOTC.find(function (err, competitiveEvent) {
    console.log('Found competitiveEvent'+competitiveEvent);
  })
  .where('date').equals(''+req.body.date)
  .then(function (data) {
    res.send(data);
  });//end of then function
});//End of getCompetitor function

app.post('/compPost', function (req, res) {
  // console.log(req.body.competitors);
  console.log('inside /compPost req.body::',req.body);
  console.log('inside /compPost req.body.date::',req.body.date);
  console.log(req.body.location);
  console.log(req.body.state);

  //for loop going through all competitors
  for(i=0; i<req.body.competitors.length; i++){
    console.log( "saving competitor: " + req.body.competitors[i].nameIn );
    /// -  save to db, cpnvert to OTC
    // putting it into an object to be saved in the db
    var competitorToAdd={
      date: req.body.date,
      location: req.body.location,
      state: req.body.state,
      nameIn: req.body.competitors[i].nameIn,
      classIn: req.body.competitors[i].classIn,
      twoStanding: req.body.competitors[i].twoStanding,
      twoXS: req.body.competitors[i].twoXS,
      twoSitting: req.body.competitors[i].twoSitting,
      twoXs: req.body.competitors[i].twoXs,
      threeProne: req.body.competitors[i].threeProne,
      threeX: req.body.competitors[i].threeX,
      sixProne: req.body.competitors[i].sixProne,
      sixX: req.body.competitors[i].sixX
     };
     // Saves the data to the database
     var newComp=ourOTC( competitorToAdd );
     newComp.save(function (err) {
       ourOTC.find(function (err, competitiveEvent) {
         console.log('Found competitiveEvent', competitiveEvent);
       })
       .where('date').equals(''+req.body.date)
       .then(function (data) {
         res.send(data);
         console.log('.then doing??', data);
         console.log('Getting all the data for req.body.date', data);
       });//end of then function
     });
  }//end of for loop
});//End of compPost






//////////////////////////////////////////////////////////////////////////////////////
// app.post('/compUpdate', function (req, res) {
//   console.log( 'LOOK -----------------> compUpdate req.body:', req.body );
//
//     console.log( 'req.body.foundId:', req.body.foundId );
//     console.log( 'req.body.competitors.length:', req.body.competitors.length );
//
//     for( var i=0; i< req.body.competitors.length; i++ ){
//       console.log( req.body.competitors );
//         updateRecord( req.body.foundId, req.body.competitors[i] );
//     }
// });//end of comp Update function
//
// function updateRecord( id, competitor ){
//   ourOTC.findByIdAndUpdate( {_id : id }, { $set: competitor }, function (err, result) {
//     if(err){
//       console.log(err);
//     }else{
//       console.log( "RESULT " + i + ": " + result );
//     }
//   }); // end findyBy
// } // end updateRecord
//////////////////////////////////////////////////////////////////////////////////////



// spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});

// static folder
app.use( express.static( 'public' ) );
