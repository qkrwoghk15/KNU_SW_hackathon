import re
import requests
from bs4 import BeautifulSoup, BeautifulStoneSoup
from .extract_keyword import get_keywords
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

def make_dict(type, title_part, rest_part, url):
	notice_dict = dict()
	notice_dict["notice_type"] = type
	
	notice_dict["link"] = title_part.find('a')['href']
	title = filter(title_part.text)
	if 'D-' in title.split()[0]: # D-day notices
		title_split = title.split()
		notice_dict["remainDays"] = title_split[0][2:]
		notice_dict["title"] = ' '.join(title_split[1:])
	else:
		notice_dict["remainDays"] = '99999'
		notice_dict["title"] = title

	if not rest_part: # [코로나-19] 방역관리 협조 요청
		notice_dict["writer"] = "임초록"
		notice_dict["registrationDate"] = "2021-05-26"
	else:
		notice_dict["writer"] = filter(rest_part[0].text)
		notice_dict["registrationDate"] = filter(rest_part[1].text)
	
	notice_dict["summary"] = get_summary(url, notice_dict["link"])
	notice_dict["keywords"] = get_keywords(notice_dict["title"], notice_dict["summary"])
    
	return notice_dict

def make_notice_dict(url):
	notice_list = []
	res = requests.get(url)
	html = BeautifulSoup(res.content, "html.parser")
	html_tr_list = html.find_all('tr')

	for tr in html_tr_list[1:]:
		if tr.find('th'):	#notice type is NaN / struct: th th td td td
			th_list = tr.find_all('th')
			td_list = tr.find_all('td')
			notice_list.append(make_dict("NaN", th_list[1], td_list[:2] if td_list else [], url))	#type, title_part, rest_part

	return sorted(notice_list, key=lambda x: int(x['remainDays'])) #notice_list 정렬
