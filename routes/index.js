var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello how are u ' });
});

//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/mongodb.ejs
router.get('/mongodb', function (request, response, next) {
  MongoClient.connect("mongodb://karthikpriya:Db%40pass1@ds157223.mlab.com:57223/heroku_7386fvlz", function(err, database) {
    if(err) throw err;
    //get collection of route
    const myAwesomeDB = database.db('heroku_7386fvlz')
    var Routes = myAwesomeDB.collection('Routes');
    //get all Routes with frequency >=1
    Routes.find({ frequency : { $gte: 1 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;
      response.render('mongodb', {results: docs});
    });

    //close connection when your app is terminating.
    database.close(function (err) {
      if(err) throw err;
    });
  });//end of connect
});//end app.get

module.exports = router;
