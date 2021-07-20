#!/usr/bin/python3
#-*- coding: utf-8 -*-
import re
import requests
from bs4 import BeautifulSoup, BeautifulStoneSoup
# ==========================
# -- Create notice dict list
# ==========================

def hsplit(s):
	return re.split(r'\s+', s)

def filter(s):
	#한글, 영어, 숫자, 특수문자만 남기고 제거
	return re.sub(u'[^ \u3130-\u318f\uac00-\ud7a3\u0041-\u005A\u0061-\u007A\u0030-\u0039\u0020-\u002f\u003A-\u0040\u005B-\u0060\u007B-\u007E]','',s)

def get_summary(url, href):
	summary = ""
	url = url + href
	res = requests.get(url)
	html = BeautifulSoup(res.content, "html.parser")
	html_content = html.find(attrs={'class':'content-view'})

	p_list = html_content.find_all('p')
	empty_line_cnt = 0
	for p in p_list:
		line = p.text.replace(u"\ufeff","").replace(u"\xa0", " ").strip()
		if line:
			if empty_line_cnt >= 2:
				empty_line_cnt = 0
				summary+='\n'
			summary += line+'\n'
		else:
			empty_line_cnt += 1

	if not summary:
		return "내용 없음"
	return summary

def make_dict(type, title_part, application, opertation, status, url):
	notice_dict = dict()
	notice_dict["notice_type"] = type
	
	notice_dict["link"] = title_part.find('a')['href']
	title = filter(title_part.text)
	notice_dict["title"] = title

	notice_dict["app_period"] = application.text
	notice_dict["oper_period"] = operation.text
	if '가능' in possible.text:
		notice_dict["status"] = 'y'
	else:
		notice_dict["status"] = 'n'

	notice_dict["summary"] = get_summary(url, notice_dict["link"])
	#notice_dict["keywords"] = get_keywords(notice_dict["title"], notice_dict["summary"])
    
	print(notice_dict)
	return notice_dict

if __name__ == '__main__':
	url = 'http://knucube.knu.ac.kr/site/reservation/lecture/lectureList?menuid=001002002&submode=lecture&reservegroupid=1'
	notice_list = []
	res = requests.get(url)
	html = BeautifulSoup(res.content, "html.parser")
	print(html)
	html_tr_list = html.find_all('tr')
	

	for tr in html_tr_list[1:]:
		if tr.find('td'):	#notice type is Cube / struct: td td td td td
			td_list = tr.find_all('td')
			notice_list.append(make_dict("cube", td_list[1], td_list[2], td_list[3], td_list[-2], url))	#type, title_part, application, operation, status
			print(td_list[1])
	

	
