#!/usr/bin/python3
#-*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from datetime import datetime
from .extract_keyword import get_keywords
# ==================================
# -- Create KNUCUBE notice dict list
# ==================================

now  = datetime.now()

def get_summary(driver, link):
	summary=""

	driver.execute_script('window.open("' + link + '");')
	driver.implicitly_wait(1)
	driver.switch_to.window(window_name=driver.window_handles[2])
	driver.implicitly_wait(1)

	page = driver.page_source
	html = BeautifulSoup(page, 'html.parser')

	driver.close()
	driver.switch_to.window(window_name=driver.window_handles[1])

	contents = html.select('.pb_none')[0]

	p_list = contents.find_all('p')
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

	return summary.lstrip()

def go_next(driver, page):
	main_frame = driver.find_element_by_name("main") #iframe 태그 엘리먼트 찾기
	driver.switch_to.frame(main_frame) #프레임 이동
	WebDriverWait(driver, timeout=5).until( #next btn
		EC.presence_of_element_located((By.XPATH, f'/html/body/div[1]/div[2]/div/form/ul/li[{str(page+2)}]/a'))
	).click()
	return page+1
	

def get_remainDays(date_to_compare):
	date_to_compare = datetime.strptime(date_to_compare, "%Y-%m-%d")
	date_diff = date_to_compare - now
	return date_diff.days+1

def make_cube_dict():
	url = 'https://my.knu.ac.kr/stpo/comm/support/loginPortal/loginForm.action?redirUrl=%2Fstpo%2Fstpo%2Fmain%2Fmain.action'

	# selenium에서 사용할 웹 드라이버 절대 경로 정보
	chromedriver = 'C:\Webdriver\chromedriver.exe'
	# selenum의 webdriver에 앞서 설치한 chromedirver를 연동한다.
	options = webdriver.ChromeOptions()
	options.add_argument("--start-maximized")
	options.add_argument("headless")
	driver = webdriver.Chrome(chromedriver, chrome_options=options)
	# driver로 특정 페이지를 크롤링한다.
	driver.implicitly_wait(3)
	driver.get(url)

	login_x_path = '/html/body/div[3]/div[2]/div/div[1]/form/fieldset/div/input'
	driver.find_element_by_id('usr_id').send_keys('qkrwoghk15')
	driver.find_element_by_id('passwd').send_keys('s351742685^^')
	driver.find_element_by_xpath(login_x_path).click()

	knu_cube = driver.find_element_by_id('knu_cube')
	driver.execute_script("arguments[0].click();", knu_cube)

	driver.switch_to.window(window_name=driver.window_handles[-1])
	
	main_frame = driver.find_element_by_name("main") #iframe 태그 엘리먼트 찾기
	driver.switch_to.frame(main_frame) #프레임 이동

	WebDriverWait(driver, timeout=5).until( #all menu
		EC.presence_of_element_located((By.XPATH, '/html/body/div[1]/div[1]/div/div[2]/div[2]/ul/li/a'))
	).click()
	WebDriverWait(driver, timeout=5).until( #비교과프로그램
		EC.presence_of_element_located((By.XPATH, '/html/body/div[3]/div/div/ul/li[2]/div/div/ul/li[2]/a'))
	).click()

	#pop up close
	driver.switch_to.window(window_name=driver.window_handles[-1])
	driver.close()
	driver.switch_to.window(window_name=driver.window_handles[-1])
	main_frame = driver.find_element_by_name("main") #iframe 태그 엘리먼트 찾기
	driver.switch_to.frame(main_frame) #프레임 이동

	cube_list = []
	next_page = 2
	valid_notice = True

	while valid_notice:
		page = driver.page_source
		html = BeautifulSoup(page, 'html.parser')
		
		tbody = html.find('tbody')
		trs = tbody.find_all('tr')
		for tr in trs:
			tds = tr.find_all('td')
			if tds[5].text.strip() == '신청가능':
				title = tds[1].text
				link = "http://knucube.knu.ac.kr/site/reservation/lecture" + tds[1].find('a')['href'][1:]
				apply_period = tds[2].text.split(' ~ ')
				summary = get_summary(driver, link)
				cube_dict = {
					"link": link,
					"title": title,
					"remainDays": get_remainDays(apply_period[1]),
					"startDate": apply_period[0],
					"endDate": apply_period[1],
					"summary": summary,
					"keywords": get_keywords(title, summary)
				}

				cube_list.append(cube_dict)
			elif tds[5].text.strip() == '교육중':
				valid_notice = False
			
		if not valid_notice: break
		
		next_page = go_next(driver, next_page)

	return sorted(cube_list, key=lambda x: int(x['remainDays'])) #notice_list 정렬