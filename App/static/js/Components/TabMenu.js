function toggleCheckBox(obj){
    if (obj.childNodes[0].checked){
        obj.childNodes[0].checked=false;
    }
    else{
        obj.childNodes[0].checked=true;
    }
}

function toggleNoticeDiv(box, divList){
    if (box.checked == true){
        for (let i=0; i<divList.length; i++){
            if(divList[i].classList.contains("not_valid") == false && divList[i].classList.contains("filtered") == false)
                divList[i].style.display = "inline-block";
        }
    } else {
        for (let i=0; i<divList.length; i++){
            divList[i].style.display = "none";
        }
    }
}

function checkedChangeHandler(box){
    if (box.id == "x__day_tab") {
        x_day_divList = document.getElementsByClassName('x__day')
        toggleNoticeDiv(box, x_day_divList)
    }
    else {
        d_day_divList = document.getElementsByClassName('d__day')
        toggleNoticeDiv(box, d_day_divList)
    }
}