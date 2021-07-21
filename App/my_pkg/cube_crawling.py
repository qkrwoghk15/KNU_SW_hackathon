#!/usr/bin/python3
#-*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from datetime import datetime
import re
import pprint
# ==================================
# -- Create KNUCUBE notice dict list
# ==================================

now  = datetime.now()

def get_summary(driver, a):
	driver.execute_script("arguments[0].click();", a)
	driver.implicitly_wait(3)
	contents = WebDriverWait(driver, timeout=5).until( #table
		EC.presence_of_element_located((By.XPATH, '/html/body/div[1]/div[2]/div/div[3]/table/tbody/tr[2]/td'))
	)
	print(contents.text)
	driver.back()

	return "0"

def go_next(driver, page):
	WebDriverWait(driver, timeout=5).until( #next btn
		EC.presence_of_element_located((By.XPATH, '/html/body/div[1]/div[2]/div/form/ul/li['+ str(page+2) +']/a'))
	).click()
	return page+1

def get_remainDays(date_to_compare):
	date_to_compare = datetime.strptime(date_to_compare, "%Y-%m-%d")
	date_diff = date_to_compare - now
	return date_diff.days+1

# def make_cube_dict():
if __name__ == "__main__":
	url = 'https://my.knu.ac.kr/stpo/comm/support/loginPortal/loginForm.action?redirUrl=%2Fstpo%2Fstpo%2Fmain%2Fmain.action'

	# selenium에서 사용할 웹 드라이버 절대 경로 정보
	chromedriver = 'C:\Webdriver\chromedriver.exe'
	# selenum의 webdriver에 앞서 설치한 chromedirver를 연동한다.
	options = webdriver.ChromeOptions()
	options.add_argument("--start-maximized")
	#options.add_argument("headless")
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

	cube_list = []
	next_page = 2
	while True:
		driver.switch_to.window(window_name=driver.window_handles[-1])
		main_frame = driver.find_element_by_name("main") #iframe 태그 엘리먼트 찾기
		driver.switch_to.frame(main_frame) #프레임 이동

		invalid_notice=0
		
		tbody = WebDriverWait(driver, timeout=5).until( #table
			EC.presence_of_element_located((By.CSS_SELECTOR, '#searchForm > div > table > tbody'))
		)
		trs = tbody.find_elements_by_tag_name('tr')
		for tr in trs:
			tds = tr.find_elements_by_tag_name('td')
			if tds[5].text == '신청가능':
				title = tds[1].text
				apply_period = tds[2].text.split('\n~ ')
				summary = get_summary(driver, tds[1].find_element_by_tag_name('a'))

				cube_dict = {
					"remainDays": get_remainDays(apply_period[1]),
					"title": title,
					"startDate": apply_period[0],
					"endDate": apply_period[1],
					"summary": summary,
					#"keywords": "get_keywords(title, summary)"
				}
				cube_list.append(cube_dict)
			else:
				invalid_notice+=1
			
		if invalid_notice==10: break
		next_page = go_next(driver, next_page)

	# return cube_list


	# cube = make_cube_dict()
	# pprint.pprint(cube)