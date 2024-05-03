import { useEffect, useState } from 'react';
// import ProblemBox from '../../components/ProblemBox';
import styled from '@emotion/styled';
import { Viewer } from './components/viewer';
import { lineCalculator } from './util';
import PageNation from './components/pagenation';

export default function Problem1() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [errorValues, setErrorValues] = useState<string[]>([]);
  const [calculatedLines, setCalculatedLines] = useState(0);
  const [range, setRange] = useState({ start: 0, end: 100 });
  // const [isLoading, setIsLoading] = useState(false);
  // const [calculatedLine, setCalculatedLine] = useState(0);
  //csv데이터 확인

  const _onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // setIsLoading(true);
    if (!file) return;

    // 파일을 읽어오는 방법1, 여러가지 파일형식이 가능함.
    // const reader = new FileReader();

    // reader.onload = (e) => {
    //   const result = e.target?.result;
    //   if (!result) return;
    // };

    // reader.readAsText(file);

    //비교적 간결하게 csv 데이터 확인이 가능함
    const data = await file.text();
    const result = data.split('\r\n').map((item) => {
      return item.split(',');
    });

    //첫번째 배열은 데이터가 아니라 제외
    //마지막 배열은 공백이라 제외
    setCsvData(result.slice(1, -1));
  };

  useEffect(() => {
    const errorValues: string[] = [];
    let calculatedLine = csvData.length;

    csvData.forEach((data) => {
      const calc = lineCalculator(data);

      if (calc.error) {
        errorValues.push(...calc.error);
        calculatedLine--;
      }
    });

    setErrorValues(errorValues);
    setCalculatedLines(calculatedLine);
  }, [csvData]);

  return (
    <>
      <Problem1Style>
        <h2>문제 1, csv 파일읽기</h2>
        {/* <ProblemBox /> */}
        <p>
          <strong>
            sample.csv 파일을 선택시 데이터를 읽어 필요한 결과를 출력합니다.
          </strong>
        </p>
        <div className="selectFile">
          <input type="file" onChange={_onChange} />
        </div>

        {csvData.length > 0 && (
          <>
            <Viewer csvData={csvData} range={range} />

            <PageNation //
              size={10000}
              setRange={setRange}
              totalItems={csvData.length}
            />

            <div className="calculate">
              <h3>계산결과</h3>
              <div>
                <div className="items">
                  <span>The total number of lines:</span>
                  <span>The number of lines calculated:</span>
                  <span>The number of error lines: </span>
                </div>
                <div className="values">
                  <span> {csvData.length.toLocaleString()}</span>
                  <span> {calculatedLines.toLocaleString()}</span>
                  <span>{errorValues}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Problem1Style>
    </>
  );
}

const Problem1Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .selectFile {
    width: 120px;
    input {
      margin: auto;
    }
  }
  .calculate {
    border-top: 2px dashed lightgray;
    margin-top: 20px;
    div {
      margin: 0 auto;
      width: 400px;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      .items,
      .values {
        display: flex;
        flex-direction: column;
      }

      .items {
        align-items: flex-end;
      }

      .values {
        margin-left: 8px;
        align-items: flex-start;
        span {
          :last-of-type {
            font-weight: 700;
            color: #284da7;
          }
        }
      }
    }
  }
`;
