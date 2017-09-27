const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true
});
const cheerio = require('cheerio');


// searching through CORE courses by professor
/*
var dep_first_url_half = 'div#sidebar > div.box.department-list:nth-child(2) > ul:nth-child(1) > li:nth-child(';
var dep_second_url_half = ') > a:nth-child(1)';
var course_first_url_half = 'div#content > div.department:nth-child(3) > div.rightcolumn:nth-child(3) > div.box.courses:nth-child(1) > ul:nth-child(2) > li:nth-child(';
var course_second_url_third = ') > a:nth-child(1) > span.course_name:nth-child(2)';
var professor_first_url_half = 'div#content > div.course.core:nth-child(1) > div.leftcolumn:nth-child(2) > div.box:nth-child(1) > ul:nth-child(1) > li:nth-child(';
var professor_second_url_half = ') > a:nth-child(1)';

nightmare
  .goto('http://culpa.info/')
  .click(dep_first_url_half + 1 + dep_second_url_half)
  .click(course_first_url_half + 1 + course_second_url_third)
  .click(professor_first_url_half + 1 + professor_second_url_half)
  .wait(1000)
  .end()
  .then(function(result) {
    console.log(result)
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
*/

// grab gold nugget professors and their courses


// first generate an array of possible professor urls
var prof_url_array = [];
for(var i = 1; i <= 100; i++) {
  prof_url_array[i] = 'http://culpa.info/professors/' + i;
}
console.dir(prof_url_array);

// then for each url page grab a mini array of the classes

prof_url_array.reduce(function(accumulator, url) {
  return accumulator.then(function(results) {
    return nightmare.goto(url)
      .wait('body')
      .title()
      .then(function(result){
        results.push(result);
        return results;
      });
  });
}, Promise.resolve([])).then(function(results){
    console.dir(results);
});


// return a new array where each element returns an array of the classes

const prof_first_url_half = 'div#content > div.listing.box:nth-child(1) > table.striped:nth-child(1) > tbody:nth-child(2) > tr:nth-child(';
const prof_second_url_half = ') > td:nth-child(1) > a:nth-child(1)';
const class_first_url_half = 'div#content > div.professor:nth-child(1) > div.box:nth-child(1) > p:nth-child(4) > a:nth-child(';
const class_second_url_half = ')';

const selector = 'span';
// get the class number from a professor page
/*
nightmare
  .goto('http://culpa.info/gold_nuggets')
  .click(prof_first_url_half + 2 + prof_second_url_half)
  .click(class_first_url_half + 3 + class_second_url_half)
  .evaluate((selector) => {
    return document.querySelector(selector).innerText;
  }, selector)
  .end()
  .then((text) => {
    console.log(text);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
*/
