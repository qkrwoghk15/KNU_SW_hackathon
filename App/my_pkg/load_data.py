from flask import session
from . import notice_crawling
# ==========================
# -- load data
# ==========================

notice_list_dict = dict()

def load_data(url, index):
    notice_list=[]

    if session.get(index): #if valid session of saved in es
        notice_list = notice_list_dict[index]

    else:
        notice_list = notice_crawling.make_notice_dict(url)
        notice_list_dict[index] = notice_list
        session[index] = True

    return {"query_url": url, "notice_list": notice_list}