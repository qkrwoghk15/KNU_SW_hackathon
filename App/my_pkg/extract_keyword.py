from .tf_idf import tfidfScorer, documents, invalid_key
# ========================
# -- extract_keywords
# ========================
def get_keywords(title, summary):
    content = (title+'\n')*5+summary

    keyword = tfidfScorer(documents+[content])[-1]
    keyword = list(filter(lambda x: x[0] not in invalid_key, keyword)) #invalid_key list에 있다면 keyword가 아님
    keyword = list(map(lambda x: x[0], sorted(keyword, key=lambda x:x[1], reverse=True)))[:3] # 세 개만 추출
    
    # title에 []로 싸여있거나, ]앞의 글자는 키워드.
    close_idx = title.find(']')
    if close_idx > -1 :
        open_idx = title.find('[')
        word = title[open_idx+1:close_idx]
        if word not in keyword:
            keyword.insert(0, word)

    return keyword