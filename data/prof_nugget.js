// create only professor and nugget JSON
var course_nugget = require('./course_nugget.json');
var fs = require('fs');

var combined_json = [];

/*
fs.readFile('./course_nugget.json', (err, data) => {
  if(err) throw err;
  console.log(data);
});
*/

// iterate course_nugget and go through the departments array for each
// look for professor and add department
for (var j = 0; j < course_nugget.length; j++) {
  var professor_name = course_nugget[j].Professor;
  var nugget = course_nugget[j].Nugget;
  combined_json.push({
    "Professor": professor_name,
    "Nugget": nugget
  });
  
  console.log("finished " + j + " out of " + course_nugget.length);
}



console.log(combined_json);


// try to append to a text file line by line
for (var i = 0; i < combined_json.length; i++) {
  fs.appendFile('professor_nugget.txt', JSON.stringify(combined_json[i]), function(err) {
    if (err) {
      throw err;
    }
  });
}
