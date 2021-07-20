let queryUrl, selected, selectedCategoryID;

function getData(category, method){
    displayLoading();

    const config = {
        method: method
    }

    fetch(`/category/${category}`, config)
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            data = JSON.parse(data)
            queryUrl = data.query_url;
            noticeList = data.notice_list
            showList(noticeList);
            Pointing(noticeList);
        });
}

function setCategory(obj){
    //검색창 비우기
    document.getElementById("search").value=""
    //selected update
    selected = obj.innerText;
    obj.classList.add('selected');
    //remove selected
    document.getElementById(selectedCategoryID).classList.remove('selected')
    selectedCategoryID = obj.id;

    makeCalendar()
    getData(selected.replace(/ /g,""), "get")
}

window.onload = function() {
    selected = "공 지 사 항";
    selectedCategoryID = "__notice"
    textFit(document.getElementById('tbCalendarYM'), {alignHoriz: true, alignVert: true, minFontSize: 10, maxFontSize: 60});
    
    makeCalendar();
    getData(selected.replace(/ /g,""), "get")
}

window.onresize = function() {
    textFit(document.getElementById('tbCalendarYM'), {alignHoriz: true, alignVert: true, minFontSize: 10, maxFontSize: 60});
}