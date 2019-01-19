// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string?',function(req,resp){
  var date_string = req.params.date_string;
  if(!date_string){
    var date = new Date();
  }
  else{
    if(!isNaN(date_string)){
      date_string = parseInt(date_string);
    }
    var date = new Date(date_string);
  }
  
  if(!Date.parse(date)){
    resp.send({"error" : "Invalid Date"});
  }
  else{
    resp.send({"unix" : date.getTime(), "utc" : date.toUTCString()});
  }
  
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
