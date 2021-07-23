# KNU_SW_hackathon [종합공지사항 페이지]

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#abstract">Abstract</a>
      <ul>
        <li><a href="#subject">Subject</a></li>
        <li><a href="#team">Team</a></li>
      </ul>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#ui">UI</a></li>
        <li><a href="#components">Components</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#set-up">Set Up</a></li>
        <li><a href="#installation--run">Installation & Run</a></li>
      </ul>
    </li>
    <li>
      <a href="#demo-video">Demo Video</a>
    </li>
  </ol>
</details>

---------------------------------------------------------------

## Abstract

### Subject

본 프로젝트는 경북대학교 SW해커톤 대회 프로젝트입니다.

최근 **COVID-19**로 인해 온라인 세미나 등의 온라인 공지가 많아졌습니다.  
그러나 늘어나는 정보량에 비해 공지사항 페이지는 정보에 대한 접근성이 떨어집니다.  

**컴퓨터학부 공지사항**의 경우,  
등록일, D-day정보로 기간을 표시합니다.    
D-day정보가 D-48, D-6처럼 숫자로 표기된 게 전부이기 때문에 사용자는 기한에 대한 정보를 한 번 더 생각해야하며,  
테이블형태로 되어있고 정렬 순서는 등록일 순서로 되어있기 때문에 곧 끝나는 공지가 눈에 띄지 않습니다.  
또한 원하는 정보를 찾으려 검색을 하려면 화면 최하단에 위치하여 스크롤바를 한참 내려야 한다는 번거로움 역시 있습니다.

**KNUCUBE 비교과프로그램 공지사항**의 경우,  
신청기간 (시작날짜~종료날짜)의 형태로 기간을 표시합니다.  
D-day 정보가 없어 눈에 띄지 않으며, 사용자는 기한을 확인하기 위해 달력을 직접 확인해야 한다는 번거로움이 있습니다.  
역시 테이블 형태로만 구성되어 있고 정렬 순서가 신청기한이 많이 남은 순이 아니기 때문에 곧 끝나는 공지에 대한 정보를 인식할 수 없습니다.  
또한 공지와 연관된 KNUCUBE의 신청페이지로 이동하는 데에도 사용자에게 많은 클릭을 요구합니다.  

<br/>

우리 팀은 이번 해커톤 프로젝트를 통해 위의 문제점들을 해결하고자 합니다.

우선 테이블 형태가 아닌 **달력 UI**를 통해 제공하여 공지의 기간정보를 눈으로 확인할 수 있게 하여 **시각적 전달 효과**를 높입니다.  
컴퓨터학부 공지사항과 KNUCUBE공지사항을 한 웹페이지에서 제공하며, 각 공지사항의 하이퍼링크를 통해 공지 세부사항이나 KNUCUBE의 신청페이지로 바로 이동할 수 있습니다.

또한 사용자는 중요한 정보 / 원하는 정보를 놓치지 않을 수 있도록,  
남은 기한 순으로 정렬하여 기한이 얼마 남지 않은 공지 정보가 먼저 사용자에게 제공되어 기한이 지나 놓치는 정보가 없도록 하며,  
키워드 검색을 통해 관련된 공지들까지 함께 확인할 수 있습니다.  

### Team 

컴퓨터학부 2016110253 박재화 *  
컴퓨터학부 2016116811 황찬웅  
글로벌sw융합전공 2017115336 강성현  
지구시스템과학부 천문대기과학 전공 2017115102 위재원

---------------------------------------------------------------

## About the Project

### UI
![image](https://user-images.githubusercontent.com/20639714/126653070-348cd42d-7db7-4202-bf9a-2506f905fac1.png)

### Components
  1. 공지사이트(컴퓨터학부 / KNUCUBE)  
    - 각 사이트의 공지사항 각각을 드롭다운 버튼을 통해 제공합니다.
    - *컴퓨터학부 공지사항*에서는 공지사항 / 취업정보 / 학부인재모집 카테고리를 제공합니다.  

  2. 달력  
    - 각 날짜 칸 클릭 이벤트: *클릭한 날짜에 유효한 공지*만을 보여줍니다.  
    - 일정 표시: 해당날짜에 기한이 종료되는 공지들이 몇 개인지 달력위에 표시됩니다.  

  3. 공지정보  
    - 각 공지는 *d-day 순*으로 정렬됩니다.    
    - 각 공지의 *mouseover 이벤트*로 해당공지의 기간만큼 달력 위에 하이라이팅을 하며, 해당 공지의 간략한 세부내용을 보여줍니다. 이 때 포스터만 있으면 "내용 없음"을 출력합니다.    
    - 각 공지를 *클릭*하면, 실제 컴학 공지사항/KNUCUBE 비교과프로그램 신청페이지로 이동합니다.  
    - 각 공지의 내용에서 추출한 키워드를 통해 키워드 검색기능을 지원합니다.  

  4. 검색창  
    - 원하는 내용만 필터링해줍니다. 제목, 작성자, 작성일, 내용 구분 없이 한 번에 검색가능하며 사용자는 드롭다운으로 검색범위를 지정할 필요가 없습니다.  
    - *컴퓨터학부 공지사항*의 경우, 검색창 위의 항시 / 기한 체크박스를 통해 기한이 있는 정보와 기한이 없는 정보를 구분해서 검색할 수도 있습니다. 

---------------------------------------------------------------

## Getting Started

실행환경은 **Window10, VSCode**를 기준으로 합니다.

### Set Up

아래 링크에서 `chromedriver_win32.zip`을 다운받아 설치하십시오.  
압축폴더를 풀면 나오는 chromedriver.exe를 `C:\Webdriver\chromedriver.exe`에 위치시키십시오.  
> https://chromedriver.storage.googleapis.com/index.html?path=91.0.4472.101/

아래의 명령어를 통해 필요한 파이썬 모듈들을 설치하십시오.  
아래 모든 모듈이 설치되어 있다면 건너뛰어도 좋습니다.  

  ```
  pip install -r requirements.txt
  ```
  ```
    # requirements.txt
    
    Flask==2.0.1
    beautifulsoup4==4.6.0
    requests==2.25.1
    requests-oauthlib==1.3.0
    requests-unixsocket==0.1.5
    konlpy==0.5.2
    nltk==3.6.2
    JPype==1.2.0
    selenium==3.141.0
  ```

### Installation & Run

1. Clone the repository
   ```sh
   git clone https://github.com/qkrwoghk15/KNU_SW_hackathon.git
   ```
   
2. Change Directory
    ```sh
    cd KNU_SW_hackathon/
    ```

3. Run Web Page

    ```sh
    python ./App/app.py
    ```
   
---------------------------------------------------------------
 
## Demo Video
 
https://youtu.be/mmPrPxOnQHQ
