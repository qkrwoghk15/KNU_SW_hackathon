from math import log10
from konlpy.tag import Okt
# =======================================
# -- TF-IDF function
# =======================================
def f(t, d):
    # d is document == tokens
    return d.count(t)

def tf(t, d):
    # d is document == tokens
    return 0.5 + 0.5*f(t,d)/max([f(w,d) for w in d])

def idf(t, D):
    # D is documents == document list
    numerator = len(D)
    denominator = 1 + len([ True for d in D if t in d])
    return log10(numerator/denominator)

def tfidf(t, d, D):
    return tf(t,d)*idf(t, D)

def tokenizer(d):
    #noun = okt.nouns(content)
    okt=Okt()
    def keyword_extractor(text):
        tokens = okt.phrases(text)
        tokens = [token for token in tokens if 1 < len(token) < 13]  # 한 글자인 단어는 제외 / 13자 이상인 긴 단어 제외
        count_dict = [(token, text.count(token)) for token in tokens]
        ranked_words = sorted(count_dict, key=lambda x: x[1], reverse=True)[:20]
        return [keyword for keyword, freq in ranked_words]
    return keyword_extractor(d)

def tfidfScorer(D):
    tokenized_D = [tokenizer(d) for d in D]
    result = []
    for d in tokenized_D:
        result.append([(t, tfidf(t, d, tokenized_D)) for t in d])
    return result