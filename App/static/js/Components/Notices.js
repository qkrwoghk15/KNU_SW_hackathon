let result = 0;
let isFiltered = false;
let noticeList = [], x_day_noticeList = [], d_day_noticeList = [], not_valid_notice = []

function displayLoading(){ //Display Loading Div 
    document.querySelector(".notices").innerHTML = 
        "<div class='notice' onmouseout='outNotice(event)' onmouseover='overNotice(event)' style='cursor:pointer; cursor: hand; margin: auto; margin-top: calc( 25% - 115.5px );'>" 
        + "<span class='remainDays'>기한</span>"
        + (selectedSite=="컴퓨터학부" ? "<p class='notice__genres'>작성자</p>" : "<h5 class='notice__year'>기한일</h5>")
        + (selectedSite=="컴퓨터학부" ? "<h5 class='notice__year'>등록일</h5>" : "<h5 class='notice__year'>&nbsp;~&nbsp;</h5><h5 class='notice__year'>등록일</h5>")
        + "<h3 class='notice__title'>&nbsp;&nbsp;"+ (selectedSite=="컴퓨터학부" ? "컴퓨터학부 공지" : "KNUCUBE 비교과프로그램" ) +"</h3>"
        + "<div class='loading-container'><div class='loading'></div><div id='loading-text'>loading</div></div>"
        + "<div class='notice__summary' style='top: 95%;'>공지 내용</div>"
        + "</div>";
}

function showList(noticeList){
    let list = ""
    for (let i = 0; i<noticeList.length; i++) {
        let remainDaySpan = "", keywordHtml = ""

        if (selectedSite=="컴퓨터학부"){ //컴퓨터학부 site
            if (noticeList[i].remainDays == '99999'){ //항시
                x_day_noticeList.push(noticeList[i])
                list += "<div class='notice x__day'"
                remainDaySpan = "<span class='remainDays'>항 시</span>"
            }
            else { //공지
                d_day_noticeList.push(noticeList[i])
                list += "<div class='notice d__day'"
                if (noticeList[i].remainDays!=0){
                    remainDaySpan = "<span class='remainDays'>D - <span style='font-size:16px;'>"+ noticeList[i].remainDays +"</span></span>"
                }
                else {
                    remainDaySpan = "<span class='remainDays' style='background-color:red;'>D - Day</span>"
                }
            }
        }
        else{ //knucube site
            d_day_noticeList.push(noticeList[i])
            list += "<div class='notice d__day'"
            remainDaySpan = "<span class='remainDays'>D - <span style='font-size:16px;'>"+ noticeList[i].remainDays +"</span></span>"
        }

        for (let j = noticeList[i].keywords.length-1; j>=0; j--) {
            keywordHtml += "<span class='notice__keyword' onclick=\"keywordSearch(event)\"'>#"+noticeList[i].keywords[j]+"</span>"
        }

        list += "id=notice_" + i + " onmouseout='outNotice(event)' onmouseover='overNotice(event)' onclick=\"window.open('" 
                + (selectedSite=="컴퓨터학부" ? queryUrl : "") + noticeList[i].link + "')\" style='cursor:pointer; cursor: hand;'>" 
                + remainDaySpan
                + "<h5 class='notice__year'>" + (selectedSite=="컴퓨터학부" ? noticeList[i].registrationDate : noticeList[i].endDate) + "</h5>"
                + (selectedSite=="컴퓨터학부" ? "<p class='notice__genres'>" + noticeList[i].writer + "</p>" : "<h5 class='notice__year'>&nbsp;~&nbsp;</h5><h5 class='notice__year'>" + noticeList[i].startDate + "</h5>")
                + "<h3 class='notice__title'>" + noticeList[i].title + "</h3>"
                + keywordHtml
                + "<div class='notice__summary'>" + noticeList[i].summary + "</div>"
                + "</div>";
    }
    document.querySelector(".notices").innerHTML = list;
}

///////////////////////////////// Get yyyy-mm-dd form date BEG /////////////////////////////////
function fillZero(num, len){
    str = num.toString();
    return str.length >= len ? str:new Array(len-str.length+1).join('0')+str;//남는 길이만큼 0으로 채움
}

function getTimeStamp(d, d_day_num) {
    temp_d = d
    temp_d.setDate(temp_d.getDate()+d_day_num)
    let s =
        fillZero(temp_d.getFullYear(), 4) + '-' +
        fillZero(temp_d.getMonth() + 1, 2) + '-' +
        fillZero(temp_d.getDate(), 2);

    return s;
}
///////////////////////////////// Get yyyy-mm-dd form date FIN/////////////////////////////////

/////////////////////////////////////// HIGHLIGHTING BEG ///////////////////////////////////////
function unSetHighlightingDiv(){
    highlightedDiv.forEach( function(div){
        div.style.visibility = 'hidden';
    });
    highlightedDiv = new Array();
}

function setHighlightingDiv(startDate, endDate){
    let curDate = startDate;
    
    while (curDate <= endDate) {
        tempDiv = document.getElementById(getTimeStamp(curDate, 0)).getElementsByClassName('highlitLine')[0]
        tempDiv.style.visibility = 'visible';
        highlightedDiv.push(tempDiv)
        curDate.setDate(curDate.getDate()+1)
    }
}

function highlightingOnCalendar(obj){
    let d_day_text = obj.innerText.split("\n")[0]
    let d_day_num = (d_day_text!="D - Day" ? parseInt(d_day_text.split("-")[1]) : 0)
    let startDateStr = (selectedSite=="컴퓨터학부" ? obj.innerText.split("\n")[1] : obj.innerText.split("\n")[3])
    let endDateStr = getTimeStamp(new Date(), d_day_num)
    let startDate = new Date(startDateStr)
    let endDate = new Date(endDateStr)
    
    //startDate가 이전 달인 경우 6 < 7
    if (today.getMonth() > startDate.getMonth())
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    if (today.getMonth() < endDate.getMonth())
        endDate = new Date(today.getFullYear(), today.getMonth()+1, 0, 9);
    
    setHighlightingDiv(startDate, endDate)
}

function outNotice(event){
    unSetHighlightingDiv();
    event.currentTarget.getElementsByClassName('notice__summary')[0].style.visibility='hidden';
}

function overNotice(event){
    highlightingOnCalendar(event.currentTarget);
    event.currentTarget.getElementsByClassName('notice__summary')[0].style.visibility='visible';
}
/////////////////////////////////////// HIGHLIGHTING FIN ///////////////////////////////////////
///////////////////////////////// Search Function /////////////////////////////////
function resetValid(){
    for (let i=0; i<noticeList.length; i++) {
        let notice = document.getElementById("notice_"+i)
        if (notice.classList.contains("not_valid"))
            notice.classList.remove("not_valid");
    }
}

function resetFilter(){
    isFiltered = false;
    for (let i=0; i<noticeList.length; i++) {
        let notice = document.getElementById("notice_"+i)
        if (selectedSite=="컴퓨터학부"){
            if ( (document.getElementById(notice.classList[1]+'_tab').checked == true) && (notice.classList.contains("not_valid") == false)){
                notice.classList.remove("filtered");
                notice.style.display = "inline-block";
            }
        } else {
            if (notice.classList.contains("not_valid") == false){
                notice.classList.remove("filtered");
                notice.style.display = "inline-block";
            }
        }
        
    }
}

function filter(key){
    isFiltered = true;
    if (key < 0){ //search action
        let count = 0;
        key = document.getElementById("search").value.toUpperCase();
        console.log(key)
        console.log(noticeList)
        for (let i=0; i<noticeList.length; i++) {
            let notice = document.getElementById("notice_"+i)
            if (notice.innerText.toUpperCase().indexOf(key) > -1){
                count+=1;
            } else {
                notice.classList.add("filtered");
                notice.style.display = "none";
            }
        }
        return count;
    }
    else{ //calendar click action
        let notice = document.getElementById("notice_"+ key)
        notice.classList.add("not_valid");
        notice.style.display = "none";
    }
}

function doSearch(key) {
    resetFilter();
    result = filter(key);
}

function enterSearch(event) {
    if(event.keyCode == 13){ //엔터 키 입력
        doSearch(-1);
    }
    else if (event.keyCode == 8 && document.getElementById("search").value.length==1){//입력 창 값 다 지울때
        resetFilter();
    }
    else if (isFiltered && document.getElementById("search").value == document.getSelection()){//전체 선택 후 아무 키
        resetFilter();
    }
}

function keywordSearch(event) {
    event.stopPropagation();
    document.getElementById("search").value = event.currentTarget.innerText.slice(1)
    doSearch(-1);
}///////////////////////////////// Search Function /////////////////////////////////