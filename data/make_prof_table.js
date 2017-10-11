var coursesbyprofjson = require('./coursesByProfFormat.json');
var nuggetsjson = require('./nuggets.json');
var test1 = require('./test1.json');
var test2 = require('./test2.json');
var fs = require('fs');

var combined_json = [];
// iterate coursesbyprofjson and filter professors to add to a new JSON
for (var i = 0; i < coursesbyprofjson.length; i++) {
  var professor_name = coursesbyprofjson[i].Professor;

  var professor_json;
  // returns the JSON of matching professor
  for (var j = 0; j < nuggetsjson.length; j++) {
    if (nuggetsjson[j].Professor !== undefined) {
      if (nuggetsjson[j].Professor.toLowerCase() === professor_name.toLowerCase()) {
        professor_json = nuggetsjson[j];
        break;
      }
    }
  }

  if (professor_json !== undefined) {
    if(professor_json.Nugget !== undefined) {
      combined_json.push({
        "Professor": professor_name,
        "Nugget": professor_json.Nugget,
        "Courses": coursesbyprofjson[i].Courses
      });
    }
  } else {
    combined_json.push({
      "Professor": professor_name,
      "Nugget": "none",
      "Courses": coursesbyprofjson[i].Courses
    });
  }

  professor_json = {};
}

// successfully combine JSONs
console.log(combined_json);

// try to append to a text file line by line
