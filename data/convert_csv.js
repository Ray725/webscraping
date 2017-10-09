xlsxj = require("xlsx-to-json");
xlsxj({
  input: "finished.xlsx",
  output: "finished.json"
}, function(err, result) {
  if(err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
