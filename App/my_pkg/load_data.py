from flask import session
from . import notice_crawling
from . import cube_crawling
# ==========================
# -- load data
# ==========================

notice_list_dict = dict()

def load_computer_data(url, index):
    notice_list=[]

    if session.get(index): #if valid session of saved in es
        notice_list = notice_list_dict[index]

    else:
        notice_list = notice_crawling.make_notice_dict(url)
        notice_list_dict[index] = notice_list
        session[index] = True

    return {"query_url": url, "notice_list": notice_list}

def load_cube_data(index):
    cube_list=[]

    if session.get(index): #if valid session of saved in es
        cube_list = notice_list_dict[index]

    else:
        cube_list = cube_crawling.make_cube_dict()
        notice_list_dict[index] = cube_list
        session[index] = True

    return {"notice_list": cube_list}