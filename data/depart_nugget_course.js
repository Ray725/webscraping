// add departments to courses and nuggets professor json
var departments = require('./departments.json');
var course_nugget = require('./course_nugget.json');
var fs = require('fs');

var combined_json = [];

// iterate course_nugget and go through the departments array for each
// look for professor and add department
for (var j = 0; j < course_nugget.length; j++) {
  var professor_name = course_nugget[j].Professor;
  var professor_json = "";

  // find the JSON in departments.json that contains professor
  for (var k = 0; k < departments.length; k++) {
    // make sure professor list exists
    console.log(departments[k]);
    if (departments[k].FIELD2.length > 0) {
      // convert to an array/list

      var professorArray = departments[k].FIELD2.split("]");

      for (var m = 0; m < professorArray.length; m++) {
        professorArray[m] = professorArray[m].replace(/\W/g, '').toLowerCase();
      }
      // iterate through professor list
      for (var l = 0; l < professorArray.length; l++) {
        // if professor found in professor list of unit
        if (professorArray[l] === professor_name.replace(/\W/g, '').toLowerCase()) {
          professor_json = departments[k];
          break;
        }
      }
    }
  }

  if (professor_json.length !== 0) {
    combined_json.push({
      "Professor": professor_name,
      "Nugget": course_nugget[j].Nugget,
      "Courses": course_nugget[j].Courses,
      "Department": professor_json.FIELD6
    });
  }

  console.log("finished " + j);
  professor_json = "";
}



console.log(combined_json);

/*
// try to append to a text file line by line
for (var i = 0; i < combined_json.length; i++) {
  fs.appendFile('depart_nugget_course.txt', JSON.stringify(combined_json[i]), function(err) {
    if (err) {
      throw err;
    }
  });
}
*/
