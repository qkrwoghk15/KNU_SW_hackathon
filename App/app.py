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

@app.route('/category/<string:selected>', methods=['GET', 'POST'])
def category(selected):
	# GET request
	if request.method == 'GET':
		if selected not in ["공지사항", "취업정보", "학부인재모집"]:
			return 'Not Found', 404

		data = my_pkg.load_data(category_url[selected], category_index[selected])
		return json.dumps(data, ensure_ascii=False)

	# POST request
	if request.method == 'POST':
		print(request.get_json())  # parse as JSON
		return 'Sucesss', 200

@app.route('/<site>', methods=['GET'])
def site_load(site):
	reset_session()
	if site=="컴퓨터학부":
		data = my_pkg.load_data(category_url["공지사항"], category_index["공지사항"])
		return json.dumps(data, ensure_ascii=False)
	elif site=="knucube":
		data = my_pkg.load_data(category_url["공지사항"], category_index["공지사항"])
		return json.dumps(data, ensure_ascii=False)

@app.route('/', methods=['GET'])
def home():
	reset_session()
	return render_template('home.html')

@app.before_first_request
def reset_session():
	for index in category_index.values():
		session.pop(index, None)

@app.before_request
def make_session_permanent():
	session.permanent = True
	app.permanent_session_lifetime = timedelta(minutes=10)

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
