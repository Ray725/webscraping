//requirements
var request = require('request');
var jf = require('jsonfile');
var Xray = require('x-ray');
var x = Xray();
var dict = {};
var fs = require('fs');

/*
request('http://culpa.info/professors/silver_nuggets?page=1', function(error, response, body) {
  console.log('error:', error);
  console.log('statusCode', response && response.statusCode);
  x('http://culpa.info/professors/silver_nuggets?page=1', 'tbody', 'td')(function(err, name) {
    var nameArray = name.split("\n");
    // get rid of empty strings from array
    nameArray = nameArray.filter(function(entry) {
      return entry.trim() != '';
    });
    // get rid of whitespace
    for (var i = 0; i < nameArray.length; i++) {
      nameArray[i] = nameArray[i].trim();
    }
    console.log(nameArray[i]);

    // make dictionary out of array
    for (var j = 0; j < nameArray.length - 1; j = j + 2) {
      dict[nameArray[j]] = nameArray[j + 1];
    }
    var jsonData = JSON.stringify(dict);
    fs.writeFile("silver1.json", jsonData, function(err) {
      if (err) {
        return console.log(err);
      }
    });

  });
});
*/
x('http://culpa.info/professors/silver_nuggets?page=1', 'tbody', 'td')(function(err, name) {
  console.log(name);
});
