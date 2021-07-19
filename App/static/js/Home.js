let categoryBtn, queryUrl, selected;

window.onload = function() {
    selected = "공 지 사 항";
    categoryBtn = [document.getElementById('__notice'),
                    document.getElementById('__employ_inf'),
                    document.getElementById('__university_recruitment')]
    
    makeCalendar();
}