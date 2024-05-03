import styled from '@emotion/styled';
import { getRandomResponse } from './request';
import { useState } from 'react';

// 값 호출후 응답시마다 값을 배열에 넣고 카운터를 센다.
// 동일 값이 잇으면 카운터 추가
// 동일 값이 없으면 배열에 추가
// 호출 횟수가 100이 되면 멈춘다.
// 배열을 출력한다.
// 카운터 총합을 출력한다.
//*호출간격시간을 설정할수있게한다.

type RandomResponse = {
  id: number;
  data: string;
  count: number;
};

export default function Problem5() {
  const [randomResponseList, setRandomResponseList] = useState<
    RandomResponse[]
  >([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const limitCall = 100;
  const intervalTime = 30;

  const callGetRandomResponse = (interval: number) => {
    getRandomResponse().then((response) => {
      if (response.status === 200) {
        setRandomResponseList((prev) => {
          // 배열에 값이 있는지 id값으로 확인
          const isExist = prev.find((item) => item.id === response.data.id);

          if (isExist) {
            // 값이 있으면 카운터 추가
            return prev.map((item) =>
              item.id === response.data.id
                ? { ...item, count: item.count + 1 }
                : item
            );
          } else {
            // 값이 없으면 , 카운터 1 추가해서 배열에 추가
            return [
              ...prev,
              { count: 1, id: response.data.id, data: { ...response.data } }
            ];
          }
        });

        setTotal((prev) => {
          //실행 횟수가 리미트에 도달하면 멈춤, 인터벌 해제
          if (prev + 1 >= limitCall) {
            clearInterval(interval);
            setIsLoading(false);
          }

          return prev + 1;
        });
      }
    });
  };

  const _onClickGetRandomResponse = () => {
    //응답중 일경우 중복 호출 방지
    if (isLoading) return;

    //100개 리스트가 있는데 재호출시 초기화
    if (total >= limitCall) {
      setRandomResponseList([]);
      setTotal(0);
      return;
    }

    setIsLoading(true);

    // 연속 호출
    const interval = setInterval(() => {
      callGetRandomResponse(interval);
    }, intervalTime);
  };

  return (
    <Problem5Style>
      <h2>Problem5</h2>
      <p>
        접속 주소 client가 직접 요청하지 않고 local 서버를 우회하여 가져옵니다
        (CORS 우회).
        <br />
        <strong>
          'root/server'위치에서 node app.js 실행 후 확인 가능합니다.
        </strong>
        <br />
      </p>
      <button disabled={isLoading} onClick={_onClickGetRandomResponse}>
        {total >= limitCall ? 'Reset' : 'GetRandomResponse'}
      </button>
      <div className="total">
        {isLoading && <span> Loading...</span>}
        {total >= limitCall && (
          <>
            <span>Total count: </span>
            <span>{total}</span>
          </>
        )}
      </div>

      <div className="list">
        {randomResponseList.length === 0 && (
          <div className="empty">데이터가 없습니다.</div>
        )}
        {randomResponseList.map((item) => (
          <div className="item" key={item.id}>
            <span className="count">count: {item.count}</span>{' '}
            <span>{JSON.stringify(item.data)} </span>
          </div>
        ))}
      </div>
    </Problem5Style>
  );
}

const Problem5Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 160px;
  }
  .total {
    width: 650px;
    font-weight: 700;
    height: 20px;
    text-align: left;
  }
  .list {
    width: 650px;
    height: 216px;
    margin-top: 20px;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    div {
      text-align: left;
    }
    .item {
      display: flex;
      .count {
        display: block;
        width: 60px;
      }
    }

    .empty {
      margin-top: 100px;
      text-align: center;
    }
  }
`;
