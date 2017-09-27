import requests
from bs4 import BeautifulSoup

raw_prof_url_array = []
num_professors_to_get = 10

def process_only_courses(input_array):
    only_courses_array = []
    for j in range(0, len(input_array)):
        if 'courses' in str(input_array[j]):
            only_courses_array.append(input_array[j])
    return only_courses_array

# generate an array of hypothetical professor urls
for i in range(num_professors_to_get):
    raw_prof_url_array.append('http://culpa.info/professors/{}'.format(i))


# get raw html links of professor courses
for i in range(num_professors_to_get):
    r = requests.get(raw_prof_url_array[i])
    soup = BeautifulSoup(r.text, 'html.parser')
    # return 1 if unfound professor error
    if(len(soup.select('p.error')) == 0):
        raw_course_array = soup.select('div.box > p > a')
        # get raw html list of course links
        only_courses_array = process_only_courses(raw_course_array)
        print(only_courses_array)
