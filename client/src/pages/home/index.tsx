import styled from '@emotion/styled';

export default function Home() {
  return (
    <HomeStyle>
      <h1> BRIQUE 코딩테스트 </h1>
      <h2>Frontend 홍인열</h2>
      <div>
        <div className="info">
          <div className="box">
            <h3>문제 풀이</h3>
            <ul>
              <li>1-5 문제 풀이완료</li>
              <li>가산점</li>
              <li>2번 서버 요청/응답시 비동기 처리 구현 완료</li>
              <li>6~8번중 6번 선택하여 풀이완료</li>
            </ul>
          </div>
          <div className="box">
            <h3>프로젝트 환경</h3>
            <ul>
              <li>React</li>
              <li>Typescript</li>
              <li>Emotion</li>
              <li>Vite</li>
              <li>Express</li>
            </ul>
          </div>
          <div className="box">
            <h3>사용한 라이브러리</h3>
            <ul>
              <li>emotion/styled</li>
              <li>react-router-dom</li>
              <li>zustand</li>
              <li>recharts</li>
              <li>date-fns</li>
              <li>axios</li>
            </ul>
          </div>
          <div className="box">
            <h3>프로젝트 실행</h3>
            node v20.9.0 / npm v10.6.0
            <h4>Client</h4>
            <ol>
              <li>npm install</li>
              <li>
                .env 환경변수 추가(Api host)
                <ul>
                  <li>VITE_API_URL= http://localhost:3000</li>
                </ul>
              </li>
              <li>npm run dev</li>
            </ol>
            <h4>sever</h4>
            <ol>
              <li>npm install</li>
              <li>
                .env 환경변수 추가
                <div>(MariaDB 사용시 필요)</div>
                <ul>
                  <li>DB_HOST</li>
                  <li>DB_USERNAME</li>
                  <li>DB_PASSWORD</li>
                  <li>DB_NAME</li>
                </ul>
              </li>
              <li>node app.js</li>
            </ol>
          </div>
        </div>
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .info {
    display: flex;
    width: 700px;
    gap: 20px;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .box {
    width: 200px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    ol,
    ul {
      padding-left: 20px;
    }
    li {
      text-align: left;
    }
  }
`;
