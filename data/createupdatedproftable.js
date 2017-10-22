var coursesbyprofjson = require('./coursesv2.json');
var nuggetsjson = require('./nuggets.json');
var fs = require('fs');

var combined_json = [];
// iterate coursesbyprofjson and iterate each professor in list
// for each professor, first check if already exists
// if yes, then add course to professor's course list
// if not, then check nugget, then add ID, name, department, course list
for (var i = 0; i < coursesbyprofjson.length; i++) {
  var professorlist = coursesbyprofjson[i]["instructors"];
  // go through professors and create professor item for each
  for (var j = 0; j < professorlist.length; j++) {
    var existing = false;
    for (var l = 0; l < combined_json.length; l++) {
      if (combined_json[l]["Name"].toLowerCase() === professorlist[j]["name"].toLowerCase()) {
        existing = true;
        combined_json[l]["Courses"].push(coursesbyprofjson[i]["courseInfo"]["course_identifier"]);
        break;
      }
    }
    if (!existing) { // if professor is not already listed create prof
      var professor_json = {};
      for (var k = 0; k < nuggetsjson.length; k++) {
        if (nuggetsjson[k]["Professor"].toLowerCase() === professorlist[j]["name"].toLowerCase()) {
          professor_json = nuggetsjson[k];
          break;
        }
      }

      if (professor_json.length !== undefined) {
        if (professor_json.Nugget !== undefined) {
          combined_json.push({
            "Name": professorlist[j]["name"],
            "Nugget": professor_json["Nugget"],
            "Department": coursesbyprofjson[i]["courseInfo"]["department"]["dept_code"],
            "Courses": [coursesbyprofjson[i]["courseInfo"]["course_identifier"]],
            "UNI": professorlist[j]["uni"]
          });
        } else {
          combined_json.push({
            "Name": professorlist[j]["name"],
            "Nugget": "none",
            "Courses": [coursesbyprofjson[i]["courseInfo"]["course_identifier"]],
            "Department": coursesbyprofjson[i]["courseInfo"]["department"]["dept_code"],
            "UNI": professorlist[j]["uni"]
          });
        }
      } else {
        combined_json.push({
          "Name": professorlist[j]["name"],
          "Nugget": "none",
          "Courses": [coursesbyprofjson[i]["courseInfo"]["course_identifier"]],
          "Department": coursesbyprofjson[i]["courseInfo"]["department"]["dept_code"],
          "UNI": professorlist[j]["uni"]
        });
      }
    }
  }
}

// successfully combine JSONs
console.log("courses by prof json", coursesbyprofjson.length);
console.log("combined json", combined_json.length);

// try to append to a text file line by line
for (var i = 0; i < combined_json.length; i++) {
  fs.appendFile('combined_json.txt', JSON.stringify(combined_json[i]), function(err) {
    if (err) {
      throw err;
    }
  });
}
