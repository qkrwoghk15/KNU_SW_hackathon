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
        <li><a href="#requirements">Requirements</a></li>
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

최근 COVID-19로 인해 온라인 세미나 등의 온라인 공지가 많아졌습니다. 그러나 늘어나는 정보량에 비해 공지사항 페이지는 정보에 대한 접근성이 떨어집니다.  

<font color='red'>컴퓨터학부 공지사항</font>의 경우,  
테이블형태로 되어있고, 등록일만 표기되어 있으며, D-day정보가 D-48, D-6처럼 숫자로 표기된 게 전부이기 때문에 사용자는 기한에 대한 정보를 한 번 더 생각해야하며,  
테이블의 정렬 순서 역시 등록일 순서이기 때문에 곧 끝나는 공지가 눈에 띄지 않습니다.  
또한 원하는 정보를 찾으려 검색을 하려면 화면 최하단에 위치하여 스크롤바를 한참 내려야 한다는 번거로움 역시 있습니다.

<font color='red'>KNUCUBE 비교과프로그램 공지사항</font>의 경우,  
신청기간 정보로만 되어 있어 D-day 정보를 볼 수 없으며, 역시 테이블 형태로만 구성되어 있고 정렬 순서가 신청기한이 많이 남은 순이 아니기 때문에 곧 끝나는 공지에 대한 정보를 인식할 수 없으며, 사용자는 기한을 확인하기 위해 달력을 직접 확인해야 한다는 번거로움이 있습니다.  

우리 팀은 이번 해커톤 프로젝트를 통해 위의 문제점을 해결하고자 했습니다.

공지를 리스트 형태가 아닌 달력 UI를 통해 제공하여 공지의 기간정보를 눈으로 확인할 수 있게 하여 시각적 전달 효과를 높입니다.

또한 남은 기한 순으로 정렬하여 기한이 얼마 남지 않은 공지 정보가 먼저 사용자에게 제공될 수 있도록 합니다.

### Team 
**[* - 팀장]**

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

  2. 달력  
    - 각 날짜 칸 클릭 이벤트: 각 날짜에 유효한 공지만을 보여줍니다.  
    - 일정 표시: 각 공지의 종료시점을 달력에 표시합니다.  

  3. 공지정보  
    - 각 공지는 d-day 순으로 정렬됩니다.    
    - 각 공지의 mouseover 이벤트로 해당공지의 기간만큼 달력 위에 하이라이팅을 합니다.    
    - 각 공지는 하이퍼링크. 실제 컴학 공지사항으로 이동.  
    - 각 공지의 내용에서 키워드를 뽑아와 키워드 검색기능 지원.  

  4. 검색창  
    - 원하는 내용만 필터링해줍니다. 제목, 작성자, 작성일, 내용 구분 없이 한 번에 검색가능합니다.  

---------------------------------------------------------------

## Getting Started

### Requirements

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
 

