var departments = require('./depts.json');
var fs = require('fs');

for (var i = 0; i < departments.length; i++) {
  console.log(`<option value="${departments[i].Code}">${departments[i].Name}</option>`);
}
