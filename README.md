# 서버실행순서
>+ 1. npm install
>+ 2. npm start
>+ 3. http://localhost:3000

# API 설명
>+ 1. http://localhost:3000  -> block hash 리스트
>+ 2. http://localhost:3000/block/:hash -> 요구사항 1. 내용표시
>+ 3. http://localhost:3000/block/:hash/:type -> 요구사항 2. 내용표시

# 코드에 대한 접근 방법
>+ blockhash 값을위한 수집기 필요
>+ 블록api를 통한 데이터 구조확인
>+ 요구사항1.은 트랜잭션의 input값들의 평균을 계산하였다

# 설계
>+ express로 api 설계
>+ request, cheerio 모듈로 수집기설계
>+ ejs view template로 간단한 화면설계

