import requests
from bs4 import BeautifulSoup

prof_url_array = []
webpage_text_array = []
for i in range(10):
    prof_url_array.append('http://culpa.info/professors/{}'.format(i))

for i in range(10):
    r = requests.get(prof_url_array[i])
    soup = BeautifulSoup(r.text, 'html.parser')
    # return 1 if unfound professor error
    if(len(soup.select('p.error')) == 0):
        # print(list(set(soup.findAll("span", {"class" : "course_number"}))))
        raw_course_array = soup.select('div.box > p > a')
        only_courses_array = []
        for i in range(0, len(raw_course_array)):
            if 'courses' in str(raw_course_array[i]):
                only_courses_array.append(raw_course_array[i])
        print(only_courses_array)
