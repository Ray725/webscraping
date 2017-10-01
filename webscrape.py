import requests
import time
import json
from bs4 import BeautifulSoup

raw_prof_url_array = []
num_professors_to_get = 2600
dictionary = {}
start_time = time.time()

def process_only_courses(input_array):
    only_courses_array = []
    for j in range(0, len(input_array)):
        if 'courses' in str(input_array[j]):
            only_courses_array.append(input_array[j])
    return only_courses_array


# generate an array of hypothetical professor urls
for i in range(400, 3000):
    raw_prof_url_array.append('http://culpa.info/professors/{}'.format(i))

# get raw html links of professor courses

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
        # get each course link
        course_links = []
        for j in range(len(only_courses_array)):
            # get course links in an array
            course_links.append(
                'http://culpa.info{}'.format(only_courses_array[j].get('href')))
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
    print("Finished", i)

elapsed_time = time.time() - start_time
print(elapsed_time)

# export as json
json = json.dumps(dictionary)
f = open("dictionary_4.json", "w")
f.write(json)
f.close()
