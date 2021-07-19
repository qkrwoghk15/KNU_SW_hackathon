let result = 0;
let isFiltered = false;

function showList(noticeList){
    let list = ""
    for (let i = 0; i<noticeList.length; i++) {
        let remainDaySpan = "", keywordHtml = ""
        if (noticeList[i].remainDays == '99999'){ //항시
            x_day_noticeList.push(noticeList[i])
            list += "<div class='notice x__day'"
            remainDaySpan = "<span class='remainDays'>항 시</span>"
        }
        else { //공지
            d_day_noticeList.push(noticeList[i])
            list += "<div class='notice d__day'"
            remainDaySpan = "<span class='remainDays'>D - <span style='font-size:16px;'>"+ noticeList[i].remainDays +"</span></span>"
        }

        for (let j = noticeList[i].keywords.length-1; j>=0; j--) {
            keywordHtml += "<span class='notice__keyword' onclick=\"keywordSearch(event)\"'>#"+noticeList[i].keywords[j]+"</span>"
        }

        list += "id=notice_" + i + " onmouseout='outNotice(event)' onmouseover='overNotice(event)' onclick=\"window.open('" + queryUrl + noticeList[i].link + "')\" style='cursor:pointer; cursor: hand;'>" 
                + remainDaySpan
                + "<h5 class='notice__year'>" + noticeList[i].registrationDate + "</h5>"
                + "<p class='notice__genres'>" + noticeList[i].writer + "</p>"
                + "<h3 class='notice__title'>" + noticeList[i].title + "</h3>"
                + keywordHtml
                + "<div class='notice__summary'>" + noticeList[i].summary + "</div>"
                + "</div>";
    }
    document.querySelector(".notices").innerHTML = list;
}