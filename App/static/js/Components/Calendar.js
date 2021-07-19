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