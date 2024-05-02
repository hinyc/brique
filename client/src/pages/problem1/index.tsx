import { useEffect, useState } from 'react';
import ProblemBox from '../../components/ProblemBox';
import styled from '@emotion/styled';

import Viewer from './viewer';

export default function Problem1() {
  const [csvData, setCsvData] = useState<string[]>([]);
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
    const result = data.split('\r\n');
    console.log('onchange');
    setCsvData(result);
    // setCalculatedLine(result.length);
  };

  useEffect(() => {
    // setIsLoading(false);
    console.log('endEffect');
  }, [csvData]);
  return (
    <>
      <Problem1Style>
        <h1>문제 1</h1>
        <ProblemBox />

        <div className="selectFile">
          <h4>파일 선택 영역</h4>
          <input type="file" onChange={_onChange} />
        </div>

        <Viewer csvData={csvData} />

        <div className="calculate">
          계산결과
          <div>The total number of lines: {csvData.length}</div>
          <div>The calculated lines: {0}</div>
          <div>The error values:</div>
        </div>
      </Problem1Style>
      ;
    </>
  );
}

const Problem1Style = styled.div`
  display: flex;
  flex-direction: column;
  .selectFile {
  }
`;
