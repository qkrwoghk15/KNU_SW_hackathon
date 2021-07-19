#!/usr/bin/python3
#-*- coding: utf-8 -*-
from flask import Flask, request, render_template, session
import argparse
import json
from datetime import timedelta
import my_pkg

_host="127.0.0.1"

category_url = {"공지사항": u'https://cse.knu.ac.kr/06_sub/02_sub.html',
				"취업정보": u'https://cse.knu.ac.kr/06_sub/03_sub.html',
				"학부인재모집": u'https://cse.knu.ac.kr/06_sub/04_sub.html'}
category_index = {"공지사항": 'announce',
				"취업정보": 'employ',
				"학부인재모집": 'recruit'}

app = Flask(__name__)
app.secret_key = 'secret_key' #session secret key

@app.route('/', methods=['GET'])
def computer():
	return render_template('com.html')

@app.route('/', methods=['GET'])
def knucube():
	return render_template('cube.html')

@app.route('/', methods=['GET'])
def home():
	return render_template('com.html')

if __name__ == '__main__':
	try:
		parser = argparse.ArgumentParser(description="")
		parser.add_argument('--listen-port', type=str, required=False, help='REST service listen port', default=5000)
		args = parser.parse_args()
		listen_port = args.listen_port
	except Exception as e:
		print('Error: %s' % str(e))

	ipaddr=_host
	print("Starting the service with ", ipaddr, listen_port)

	app.run(debug=False, host=ipaddr, port=int(listen_port))
