# KNU_SW_hackathon

# OSP_project_team6

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Abstract</a>
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

기존의 공지사항 웹페이지와 달리,

단순 리스트 형태가 아닌 달력을 통해 공지의 기간을 눈으로 확인할 수 있어 시각적 전달 효과를 높입니다.

또한 검색창이 위에 배치되어 접근성 면에서도 뛰어납니다.

### Team [*:팀장]

컴퓨터학부 2016110253 박재화 *

컴퓨터학부 2016116811 황찬웅

글로벌sw융합전공 2017115336 강성현

지구시스템과학부 천문대기과학 전공 2017115102 위재원


---------------------------------------------------------------

## About the Project

### UI
![image](https://user-images.githubusercontent.com/20639714/117573992-079c1b00-b116-11eb-8357-a141c950e404.png)

### Components
  1. 카테고리버튼(공지사항 / 취업정보 / 학부인재모집)  
    - 각 카테고리별 다른 공지 달력을 보여줍니다.  

  2. 달력  
    - 각 날짜 칸 클릭 이벤트: 각 날짜에 유효한 공지만을 보여줍니다.  
    - 일정 표시: 각 일정의 종료시점을 달력에 표시합니다.  

  3. 상세정보  
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
   
---------------------------------------------------------------
 
## Demo Video
 

