import styled from '@emotion/styled';
import { useState } from 'react';
import { _onChangeInputValue, _onKeyPressInputValue } from './util';

export default function Problem6() {
  const [inputArray, setInputArray] = useState([6, 9, 5, 7, 4]);
  const [result, setResult] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValueArray, setInputValueArray] = useState<string[]>([]);

  const _onClickSolveProblem = () => {
    setIsLoading(true);
    // 배열을 뒤집어 findIndex를 사용하여 인데스를 찾는다.
    // 원본 인덱스를 계산하여 배열을 만든다.
    const result: number[] = [];
    const reverseArray = [...inputArray].reverse();

    reverseArray.forEach((value, index) => {
      const forLoopArray = reverseArray.slice(index + 1);

      const getIndex = forLoopArray.findIndex(
        (forLoopValue) => forLoopValue > value
      );

      //없으면 0을 넣어준다.
      if (getIndex === -1) {
        result.unshift(0);
        return;
      }

      //원래 배열의 인덱스를 찾기위해, 전체 배열의 길이에서 현재 인덱스를 빼준다.
      result.unshift(inputArray.length - (getIndex + index + 1));
    });

    setResult(result);
    setIsLoading(false);
  };

  const _onClickSolveProblem2 = () => {
    // input 값의 배열을 받아서, 거꾸로 반복문을 실행시킨다
    setIsLoading(true);
    const result: number[] = [];

    for (let i = inputArray.length - 1; i >= 0; i--) {
      let isFind = false;
      for (let j = i - 1; j >= 0; j--) {
        if (inputArray[i] < inputArray[j]) {
          result.unshift(j + 1);
          isFind = true;
          break;
        }
      }
      if (!isFind) {
        result.unshift(0);
      }
    }
    setResult(result);
    setIsLoading(false);
  };

  const _onClickSetInput = () => {
    setInputArray(
      inputValueArray.filter((item) => item !== '').map((item) => Number(item))
    );
    setInputValueArray([]);
    setResult([]);
  };

  return (
    <Problem6Style>
      <h2>문제 6, 신호 수신 탑</h2>

      <div className="value__box">
        <p className="inputValue">
          <span>Input:</span>[ {inputArray.join(', ')} ]
        </p>
        <p className="outputValue">
          <span>Output:</span>[ {result.join(', ')} ]
        </p>
      </div>
      <div className="button__box">
        <button disabled={isLoading} onClick={_onClickSolveProblem}>
          Solve1
        </button>
        <button disabled={isLoading} onClick={_onClickSolveProblem2}>
          Solve2
        </button>
      </div>
      <div className="set__input__box">
        <h4>Input data 변경</h4>
        <div>
          <input
            type="text"
            value={inputValueArray.join(', ')}
            onChange={(e) => _onChangeInputValue(e, setInputValueArray)}
            onKeyDown={(e) =>
              _onKeyPressInputValue(e, inputValueArray, setInputValueArray)
            }
          />
          <button onClick={_onClickSetInput}> Set Input</button>
        </div>
      </div>

      <p>
        <h4>Solve1</h4>
        1. input 값의 배열을 받아서, 거꾸로 반복문을 실행시킨다 <br />
        2. 이중 반복문을 통해 현재 값보다 낮은 인덱스 값들중, 현재 값보다
        큰값이면서 인덱스가 가장 큰값을 찾는다. <br />
        3. 찾은값의 인덱스 +1 을 결과 배열에 unshift 한다. <br />
        4. 없으면 0을 결과 배열에 unshift 한다. <br />
        5. 결과 배열을 반환한다.
        <br />
        <h4>Solve2</h4>
        1. 배열을 뒤집어 findIndex를 사용하여 인덱스를 찾는다. <br />
        2. 원본 인덱스를 계산하여 배열을 만든다.
      </p>
    </Problem6Style>
  );
}

const Problem6Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    text-align: left;
  }
  .value__box {
    p {
      font-weight: 700;
      span {
        display: inline-block;
        width: 60px;
        text-align: right;
        margin-right: 4px;
        font-size: 12px;
      }
      &.inputValue {
        color: blue;
      }
      &.outputValue {
        color: red;
      }
    }
  }
  .button__box {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
    button {
      width: 160px;
    }
  }

  .set__input__box {
    margin-top: 20px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        text-align: center;
        padding: 8px 16px;
        font-size: 12px;
        width: 600px;
        border-radius: 8px;
        border: 1px solid gray;
        :focus {
          outline: none;
        }
      }
      button {
        margin-left: 16px;
      }
    }
  }
`;
