var express = require('express');
var app = express();
var hotels = require('./models/hotel');

// GET /hotels
// GET /hotels?city=:city
// GET /hotels?order=[asc|desc]
app.get('/hotels', function(req, res) {
  hotels.get(req.headers['X-API-Key'] || req.headers['x-api-key'], function(err, hotelList) {
    if (err) return res.status(503).json(err);

    var filteredList = hotelList;

    // Filter by city name
    if (req.query.city && (typeof req.query.city === 'string')) {
      filteredList = [];
      var city = req.query.city.toLowerCase();
      hotelList.forEach(function(hotel) {
        if (hotel.city.toLowerCase() === city) filteredList.push(hotel);
      });
    }

    // Order by price
    if (req.query.order && (typeof req.query.order === 'string')) {
      var order = req.query.order.toLowerCase();
      if (order === 'asc') {
        filteredList.sort(function(a, b) { return a.price - b.price; });
      } else if (order === 'desc') {
        filteredList.sort(function(a, b) { return b.price - a.price; });
      }
    }

    res.status(200).json(filteredList);
  });
});

// GET /hotels/:id
app.get('/hotels/:id', function(req, res) {
  var id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.json(400, 'Invalid Hotel ID.');

  hotels.get(req.query.api_key, function(err, hotelList) {
    if (err) return res.status(503).json(err);
    for (var i = 0; i < hotelList.length; ++i) {
      if (hotelList[i].id === id) return res.status(200).json(hotelList[i]);
    }
    return res.status(200).json([]); // no such hotel exists
  });
});

// All other routes
app.get('*', function(req, res) {
  res.send('Not Found', 404);
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
