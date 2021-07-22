const root = document.querySelector(".dropdown-container");
const dropdownTitleIcon = document.querySelector(".dropdown-title-icon");
const dropdownTitle = document.querySelector(".dropdown-title");
const dropdownList = document.querySelector(".dropdown-list");
const mainButton = document.querySelector(".main-button");
const floatingIcon = document.querySelector(".floating-icon");
const title = document.querySelector("#title");
const category_btn = document.querySelector(".category_btn");
const tab_menu = document.querySelector(".tab__menu");
let selectedSite = "컴퓨터학부"

function getSite(site, method){
    makeCalendar();
    displayLoading();

    const config = {
        method: method
    }

    fetch(`/${site}`, config)
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            data = JSON.parse(data)
            noticeList = data.notice_list
            showList(noticeList);
            Pointing(noticeList);
        });
}


/******************************************************************* const variables BEG *******************************************************************/ 
const siteInnerHTML_category_btn = {
    컴퓨터학부:
        `<form class = "category_form" method="POST" action = "/category"></form>
            <li><a href='javascript:void(0);' class = "btn selected" id="__notice" onclick="setCategory(this)">공 지 사 항</a></li>
            <li><a href='javascript:void(0);' class = "btn" id="__employ_inf" onclick="setCategory(this)">취 업 정 보</a></li>
            <li><a href='javascript:void(0);' class = "btn" id="__university_recruitment" onclick="setCategory(this)">학부인재모집</a></li>
        </form>`,
    knucube:
        ``,
}

const siteInnerHTML_tab_menu = {
    컴퓨터학부:
        `<span><input type='checkbox' id="x__day_tab" name='filter__d__day' value='x__day_notice' checked="checked" onchange="checkedChangeHandler(this)"/><label for="x__day_tab" onclick="toggleCheckBox(this)">항시</label></span>
        <span><input type='checkbox' id="d__day_tab" name='filter__d__day' value='d__day_notice' checked="checked" onchange="checkedChangeHandler(this)"/><label for="d__day_tab" onclick="toggleCheckBox(this)">기한</label></span>`,
    knucube:
        ``,
}

const titleWidth = {
    컴퓨터학부:
        `460px`,
    knucube:
        `445px`,
}

const iconViewBoxSize= {
    컴퓨터학부:
        `viewBox="0 0 120 48"`,
    knucube:
        `viewBox="0 0 64 64"`,
}

const icons = {
    컴퓨터학부:
        `<image xlink:href="/static/images/computer-logo.png"/>`,
    knucube:
        `<image xlink:href="/static/images/cube-logo.png"/>`,
};

const listItems = ["컴퓨터학부", "KNUCUBE"];

/******************************************************************* const variables FIN *******************************************************************/ 

/******************************************************************* const ELEMENTS BEG *******************************************************************/ 
const iconTemplate = (path, box) => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" ${box}>
        ${path}
    </svg>
    `;
};

const listItemTemplate = (text, translateValue) => {
    return `
    <li class="dropdown-list-item">
        <button class="dropdown-button list-button" data-translate-value="${translateValue}%" name="site" value="${text}">
            <span class="text-truncate">${text}</span>
        </button>
    </li>
    `;
};

const renderListItems = () => {
    dropdownList.innerHTML += listItems
        .map((item, index) => {
        return listItemTemplate(item, 100 * index);
        })
        .join("");
};

renderListItems();

const setDropdownProps = (deg, ht, opacity) => {
    root.style.setProperty("--rotate-arrow", deg !== 0 ? deg + "deg" : 0);
    root.style.setProperty("--dropdown-height", ht !== 0 ? ht + "rem" : 0);
    root.style.setProperty("--list-opacity", opacity);
};

mainButton.addEventListener("click", (e) => {
    e.preventDefault();
    const listWrapperSizes = 3.5; // margins, paddings & borders
    const dropdownOpenHeight = 4.6 * listItems.length + listWrapperSizes;
    const currDropdownHeight =
        root.style.getPropertyValue("--dropdown-height") || "0";
    
    currDropdownHeight === "0"
    ? setDropdownProps(180, dropdownOpenHeight, 1)
    : setDropdownProps(0, 0, 0);
});

dropdownList.addEventListener("mouseover", (e) => {
    const translateValue = e.target.dataset.translateValue;
    root.style.setProperty("--translate-value", translateValue);
});

dropdownList.addEventListener("click", (e) => {
    e.preventDefault();

    const clickedItemText = e.target.innerText.toLowerCase().trim();
    const clickedItemIcon = icons[clickedItemText];
    const clickedItemIconBox = iconViewBoxSize[clickedItemText];

    dropdownTitleIcon.innerHTML = iconTemplate(clickedItemIcon, clickedItemIconBox);
    dropdownTitle.innerHTML = clickedItemText;

    title.innerHTML = clickedItemText.toUpperCase();
    mainButton.style.width = titleWidth[clickedItemText];

    category_btn.innerHTML = siteInnerHTML_category_btn[clickedItemText]
    tab_menu.innerHTML = siteInnerHTML_tab_menu[clickedItemText]
    
    selectedCategoryID = "__notice"

    selectedSite = clickedItemText
    getSite(clickedItemText, "get")

    setDropdownProps(0, 0, 0);
});

dropdownList.addEventListener("mousemove", (e) => {
    const iconSize = root.style.getPropertyValue("--floating-icon-size") || 0;
    const x = e.clientX - dropdownList.getBoundingClientRect().x;
    const y = e.clientY - dropdownList.getBoundingClientRect().y;
    const targetText = e.target.innerText.toLowerCase().trim();
    const hoverItemText = icons[targetText];
    const hoverItemIconBox = iconViewBoxSize[targetText];

    floatingIcon.innerHTML = iconTemplate(hoverItemText, hoverItemIconBox);
    root.style.setProperty("--floating-icon-left", x - iconSize / 2 + "px");
    root.style.setProperty("--floating-icon-top", y - iconSize / 2 + "px");
});
