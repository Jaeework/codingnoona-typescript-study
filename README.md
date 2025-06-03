# { ; } 코알누 타입스크립트 스터디 1기
[코딩 알려주는 누나 타입스크립트 스터디](https://codingnoona.thinkific.com/pages/3c7ff4) (2025.05.26 - )

<br/>

## Week 1
### 1.1 [원시타입, 객체 & 배열 & 튜플](https://hackmd.io/@qEGG2y5qSJeoFpoWLh1Dzw/HkyMhSbMle)

### 1.2 [type & interface, 고급 타입](https://hackmd.io/@qEGG2y5qSJeoFpoWLh1Dzw/BJW2mPQzee)
- type & interface
- enum
- any, unknown, void, never

### 1.3 [교차타입, 유니온 타입](https://hackmd.io/@qEGG2y5qSJeoFpoWLh1Dzw/H15NIO4Mel)
### 1.4 [제네릭 타입, 리터럴 타입](https://hackmd.io/@qEGG2y5qSJeoFpoWLh1Dzw/Bk3wtyLzll)
### 1.5 [유틸리티 타입, Record 타입](https://hackmd.io/@qEGG2y5qSJeoFpoWLh1Dzw/SJ25fLvzlg)
### 1.6 [타입 활용하기 - extends, as, infer](https://hackmd.io/@qEGG2y5qSJeoFpoWLh1Dzw/rJdKodwGgl)

## Week 2
### 2.1 플레이리스트 웹사이트 만들기 - 환경설정

**💡유저 스토리**

1. 유저는 홈페이지에서 New released album, Tracks, Albums 정보를 볼 수 있다.
2. 유저는 사이드 메뉴에서 Home과 Search를 볼 수 있다.
3. 유저는 로그인 할 수 있다.
4. 로그인을 한 유저는 사이드바에서 플레이리스트를 볼 수 있다.
5. 유저는 플레이리스트를 클릭하면 디테일한 플레이리스트 정보를 볼 수 있다.
6. 플레이리스트에 곡이 없을 경우 유저는 검색화면을 볼 수 있다.
7. 유저는 곡을 검색하고 + 버튼을 눌러 곡을 바로 추가할 수 있다.
8. 유저는 + 버튼을 눌러 새로운 플레이리스트를 추가할 수 있다.
9. 메뉴에서 Search 를 누르면 서치페이지를 볼 수 있다.
10. 서치페이지는 카테고리들을 볼 수 있다.
11. 서치페이지에서 유저는 검색을 할 수 있다.
12. 검색결과로 유전느 Top Result, songs, artists, albums 정보를 볼 수 있다.
13. song에 있는 + 버튼을 클릭하면 추가하고싶은 플레이리스트를 볼 수 있다.
14. 플레이리스트를 클릭하면 해당 플레이리스트로 곡이 추가된다.
15. 유저가 로그인 하지 않은 경우 로그인하시오라는 메세지가 하단에 뜬다.
16. 유저가 로그인하지 않은 상태에서 플레이리스트에 접근한다면 로그인하시오 메세지와 버튼을 볼 수 있다.
17. 유저는 로그아웃 할 수 있다.

- [X] webpack, Babel 설정
- [X] 라우터 설정 using Lazy Loading, Suspense
- [X] 공통 사용되는 Loading Spinner 컴포넌트 생성

### 2.2 플레이리스트 웹사이트 만들기 이어서...
- [X] MUI 테마 파일 설정(theme.ts)
- [X] 사이드바 레이아웃 만들기 (Home, Search 메뉴)
- [x] 플레이리스트 헤더 만들기
- [x] 비로그인 유저 및 플레이리스트가 없을 때 보여줄 컴포넌트 생성
