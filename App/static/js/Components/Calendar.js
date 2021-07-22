const redPoint = "<span style='position:absolute; top:calc( 90% - 4px ); left:calc( 50% - 4px ); background-color:red; width:8px; height:8px; border-radius: 6px;'></span>"
const highlightSpan = "<span class= highlitLine style='visibility: hidden; position:absolute; top:calc( 50% - 6px ); left:-3px; background-color: #00FF0040; width: calc( 100% + 8px ); height:12px;'></span>"

let highlightedDiv = new Array();
let monthToDate = {1:0,2:31,3:59,4:90,5:120,6:151,7:181,8:212,9:243,10:273,11:304,12:334}
let today = new Date(); //today date
let dates = new Date(); //count of today's Date
let thisMonth, selectedDay="None";

function prevCalendar(){ //prev month calendar
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    makeCalendar();
    Pointing(noticeList);
}

function nextCalendar(){ //next month calendar
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    makeCalendar();
    Pointing(noticeList);
}

function makeCalendar(){
    thisMonth = new Date(today.getFullYear(), today.getMonth(), 1); //first day of this month
    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); //last day of this month
    var tbCalendar = document.getElementById("calendar");
    var tbCalendarYM = document.getElementById("tbCalendarYM");
    tbCalendarYM.innerHTML = today.getFullYear()+"년 "+(today.getMonth() + 1)+"월";

    while (tbCalendar.rows.length > 2) { //move to the next month
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }
    var row = null; //init row
    row = tbCalendar.insertRow();
    var cnt = 0; //# of cell
    for (i=0; i<thisMonth.getDay(); i++) {
        cel = row.insertCell();
        cnt = cnt + 1;
    }

    /* display calendar */
    for (i=1; i<=lastDate.getDate(); i++) {
        const divId = today.getFullYear() + "-" +
                        fillZero(today.getMonth() + 1, 2) + "-" +
                        fillZero(i, 2);
        cnt = cnt + 1;
        cell = row.insertCell();
        
        if ( cnt % 7 == 1 ) { //Sunday
            cell.innerHTML = "<div id="+ divId +" onclick=clickHandler(this) style='cursor: pointer; cursor: hand; color:#F79DC2;'>" + i + highlightSpan
        }
        else if ( cnt % 7 == 0 ) { //Saturday
            cell.innerHTML = "<div id="+ divId +" onclick=clickHandler(this) style='cursor: pointer; cursor: hand; color:#447FC1;'>" + i + highlightSpan
            row = calendar.insertRow();
        }
        else 
            cell.innerHTML = "<div id="+ divId +" onclick=clickHandler(this) style='cursor: pointer; cursor: hand;'>"+ i + highlightSpan
        
        if ( today.getFullYear() == dates.getFullYear() 
            && today.getMonth() == dates.getMonth() 
            && i == dates.getDate()) {//today
            cell.style.backgroundColor = "rgba(255, 219, 221)"
        }
    }
}

function clickHandler(obj){
    drawBorder(obj);
    document.getElementById("search").value=""
    showValid(parseInt(obj.innerText));
}

function drawBorder(obj){
    if (selectedDay!="None")
        selectedDay.style.border = "3px solid rgba(0,0,0,0)";
    obj.parentNode.style.border = "3px solid #DA212780";
    selectedDay = obj.parentNode
}

function showValid(num){
    resetValid()
    resetFilter()
    cnt = 0
    for (let j = 0; j<noticeList.length; j++) {
        if(!isValid(j,num)){
            filter(j)
        }
        else{
            cnt ++
        }
    }
}

function isValid(j,num){
    temp = noticeList[j].registrationDate.split('-')
    Rday = monthToDate[Number(temp[1])] + Number(temp[2])
    Dday = Number(noticeList[j].remainDays)+dates.getDate() + monthToDate[dates.getMonth()+1]
    Nday = num+monthToDate[today.getMonth()+1]
    if ( (Nday>=Rday && Nday<=Dday)){
        if (Nday==Dday){
            return 2
        }
        return 1
    }
    else return 0
}

function Pointing(noticeList){
    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var arr = new Array(32).fill(0)
    for (i=1; i<=lastDate.getDate(); i++) {
        const divId = today.getFullYear() + "-" +
                        fillZero(today.getMonth() + 1, 2) + "-" +
                        fillZero(i, 2);

        thisDiv = document.getElementById(divId)

        v = -1
        for (let j = 0; j<noticeList.length; j++){
            v=isValid(j,i)
            if (v==2) arr[i] ++
        }
        
        
    }

    for(i=1;i<arr.length;i++){
        if(arr[i]!=0){
            const divId = today.getFullYear() + "-" +
            fillZero(today.getMonth() + 1, 2) + "-" +
            fillZero(i, 2);

            document.getElementById(divId).innerHTML +=  "<div style='position:absolute;left:calc(38%);background:red; color:white; width:20px; height:20px; border-radius:50%;text-align:center; font-weight:bold;font-size:10pt;'>"+arr[i]+"</div>"
            //`<span style='position:absolute;  top:calc( 90% - 14px ); left:calc(50%);border-radius:90%; background:red; text-align:center; font-size:20px; color:white'>&#9312</span>`//"&#9312"
        }
        
    }
    
}
