var coursesbyprofjson = require('./coursesByProfFormat.json');
var nuggetsjson = require('./nuggets.json');
var test1 = require('./test1.json');
var test2 = require('./test2.json');
var fs = require('fs');

var combined_json = [];
// iterate through coursesbyprofjson and filter professor JSON and add to a new JSON
for(var i = 0; i < coursesbyprofjson.length; i++) {
  var professor_name = coursesbyprofjson[i].Professor;
  console.log(professor_name);
  var professor_json = nuggetsjson.filter(function(value) {
    if(value.Professor === professor_name) {
      return value;
    }
  });
  console.log(professor_json);
  combined_json.push({"Professor": professor_name, "Nugget": professor_json.Nugget, "Courses": coursesbyprofjson[i].Courses});
}

//console.log(combined_json);

fs.writeFile("./combined_json.txt", combined_json, function(err) {
  if(err) {
    console.log(err);
    return;
  };
  console.log("File has been created");
});
