# webscraping
developing project Classify. webscraping scripts and extensive data cleaning to format properly for MongoDB database

## involved skills
### employed Python dictionary data structure:
```python
# now make an array of course numbers from scraping course links
course_numbers = []
for k in range(len(course_links)):
  q = requests.get(course_links[k])
  soupTwo = BeautifulSoup(q.text, 'html.parser')
    try:
      course_numbers.append(soupTwo.span.text)
    except:
      course_numbers.append(soupTwo.h1.text.strip(' \n'))
# merge with dictionary
dic_item = {name: course_numbers}
# make dictionary of professors and corresponding course list
dictionary.update(dic_item)
  ...
# export as json
json = json.dumps(dictionary)
f = open("dictionary_4.json", "w")
f.write(json)
f.close()
```

### used Requests and BeautifulSoup libraries to parse html pages formatted in difficult ways:
```python
for i in range(num_professors_to_get):
    r = requests.get(raw_prof_url_array[i])
    soup = BeautifulSoup(r.text, 'html.parser')
    # returns 1 if unfound professor error
    if(len(soup.select('p.error')) == 0):
        # get professor name
        try:
            name = soup.h1.text
            name = name.strip(' \n')
        except:
            continue
        # get raw html
        raw_course_array = soup.select('div.box > p > a')
        # get a course tags for given professor
        only_courses_array = process_only_courses(raw_course_array)
        ...
```

### extensive work with JSON and CSV data formats:

```javascript
if (professor_json !== undefined) {
    if (professor_json.Nugget !== undefined) {
      combined_json.push({
        "Professor": professor_name,
        "Nugget": professor_json.Nugget,
        "Courses": coursesbyprofjson[i].Courses
      });
    } else {
      combined_json.push({
        "Professor": professor_name,
        "Nugget": "none",
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
```

### used the node file system module:
```javascript
for (var i = 0; i < combined_json.length; i++) {
  fs.appendFile('combined_json.txt', JSON.stringify(combined_json[i]), function(err) {
    if (err) {
      throw err;
    }
  });
}
```
