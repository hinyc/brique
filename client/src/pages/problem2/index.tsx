import { useState } from 'react';
import styled from '@emotion/styled';
import { simpleRequest } from './request';

export default function Problem2() {
  const [inputValue, setInputValue] = useState('');

  const [requestList, setRequestList] = useState<string[]>([]);
  const [responseList, setResponseList] = useState<string[]>([]);

  const _onClickRequest = async () => {
    if (inputValue.length < 1) {
      setRequestList([...requestList, 'Ping']);
    } else {
      setRequestList([...requestList, inputValue]);
    }

    const result = await simpleRequest(inputValue);
    setResponseList((state) => [...state, result]);
  };

  const _onClickReset = () => {
    if (requestList.length < 1) return;
    setRequestList([]);
    setResponseList([]);
  };
  // console.log('requestList', requestList);
  // console.log('responseList', responseList);
  return (
    <Problem2Style>
      <h2>문제 2, Ping-Pong</h2>
      <div className="reset">
        <button onClick={_onClickReset}>Reset</button>
      </div>
      <div className="request__response">
        <div className="box request">
          <h4>요청</h4>

          <div className="request__input__box">
            <input //
              type="text"
              placeholder="Ping"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={_onClickRequest}>전송</button>
          </div>

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
  .request__response {
    display: flex;
    gap: 20px;
    .box {
      width: 250px;
      padding: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      .request__input__box {
        height: 30px;
        input {
          height: 20px;
        }
        button {
          margin-left: 8px;
        }
      }

      .dummy__box {
        height: 30px;
      }
      .list {
        margin-top: 8px;
        border-top: 1px solid lightgray;
        min-height: 200px;
        max-height: calc(100vh - 250px);
        overflow: auto;
      }
    }
  }
`;
