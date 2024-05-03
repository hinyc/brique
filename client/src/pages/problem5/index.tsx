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
          //실행 횟수
          if (prev + 1 === 100) {
            clearInterval(interval);
          }

          return prev + 1;
        });
      }
    });
  };

  const _onClickGetRandomResponse = () => {
    const interval = setInterval(() => {
      callGetRandomResponse(interval);
    }, 30);
  };

  return (
    <Problem5Style>
      <h2>Problem5</h2>

      <button onClick={_onClickGetRandomResponse}>GetRandomResponse</button>

      <div className="list">
        {randomResponseList.map((item) => (
          <div key={item.id}>
            <span>count: {item.count}</span>{' '}
            <span>{JSON.stringify(item.data)} </span>
          </div>
        ))}
      </div>

      <div>
        <span>total count: </span>
        <span>{total}</span>
      </div>
    </Problem5Style>
  );
}

const Problem5Style = styled.div`
  .list {
    height: 216px;
    margin-top: 20px;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    div {
      text-align: left;
    }
  }
`;
