var fs = require('fs');
var parse = require('csv-parse');
var config = require('../config');

exports.get = function(apiKey, callback) {
  if (!apiKey || config.apiKey.indexOf(apiKey) < 0) return callback('Invalid API key', []);

  fs.readFile(__dirname + '/../hoteldb.csv', 'utf8', function(err, data) {
    if (err) callback(err, []);
    parse(data, { delimiter: ',' }, function(err, hotels) {
      hotels.shift();
      var hotelsJSON = [];
      hotels.forEach(function(hotel) {
        hotelsJSON.push({
          id: parseInt(hotel[1], 10),
          city: hotel[0],
          room: hotel[2],
          price: parseInt(hotel[3], 10)
        });
      });
      callback(null, hotelsJSON);
    });
  });
};
