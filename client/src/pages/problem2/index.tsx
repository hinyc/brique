import { useState } from 'react';
import styled from '@emotion/styled';
import { simpleRequest } from './request';

export default function Problem2() {
  const [inputValue, setInputValue] = useState('');
  const [requestList, setRequestList] = useState<string[]>([]);
  const [responseList, setResponseList] = useState<string[]>([]);
  const [isNetworkError, setIsNetworkError] = useState(false);

  const _onClickRequest = async () => {
    if (inputValue.length < 1) {
      setRequestList([...requestList, 'Ping']);
    } else {
      setRequestList([...requestList, inputValue]);
    }

    setInputValue('');

    const result = await simpleRequest(inputValue);

    console.log(result);
    if (result.status === 500) {
      return setIsNetworkError(true);
    }
    setIsNetworkError(false);
    setResponseList((state) => [...state, result]);
  };

  const _onClickReset = () => {
    if (requestList.length < 1) return;
    setRequestList([]);
    setResponseList([]);
  };

  return (
    <Problem2Style>
      <h2>문제 2, Ping-Pong</h2>
      <p>
        비동기식 요청/응답구현, express server(TCP) 사용.
        <br />
        <strong>'root/server'위치에서 node app.js 실행 후 확인 가능합니다.</strong>
        <br />
        {isNetworkError && <span className="error">네트워크 에러(500)가 발생했습니다.</span>}
      </p>
      <div className="action__box">
        <div className="request__input__box">
          <input //
            type="text"
            placeholder="Ping"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={_onClickRequest}>전송</button>
        </div>
        <div className="reset">
          <button onClick={_onClickReset}>Reset</button>
        </div>
      </div>
      <div className="request__response">
        <div className="box request">
          <h4>요청</h4>

          <div className="list">
            {requestList.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>

        <div className="box response">
          <h4>응답</h4>

          <div className="dummy__box"></div>

          <div className="list">
            {responseList.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Problem2Style>
  );
}

const Problem2Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: space-between;

  p {
    position: relative;
    .error {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      display: block;
      margin-top: 8px;
      color: red;
      font-weight: 700;
    }
  }

  .action__box {
    display: flex;
    gap: 20px;
    .request__input__box {
      height: 30px;
      input {
        height: 20px;
      }
      button {
        margin-left: 8px;
      }
    }
  }
  .request__response {
    display: flex;
    gap: 20px;
    .box {
      width: 250px;
      padding: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .list {
        margin-top: 8px;
        border-top: 1px solid lightgray;
        min-height: 200px;
        max-height: calc(100vh - 350px);
        overflow: auto;
      }
    }
  }
`;
