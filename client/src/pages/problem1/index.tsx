import { useState } from 'react';
import ProblemBox from '../../components/ProblemBox';
import Problem1Style from './ style';
import { lineCalculator } from './util';

export default function Problem1() {
  const [csvData, setCsvData] = useState<string[]>([]);
  //csv데이터 확인
  const _onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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

    setCsvData(data.split('\r\n'));
  };

  return (
    <>
      <Problem1Style>
        <h1>문제 1</h1>
        <ProblemBox />

        <div className="selectFile">
          <h4>파일 선택 영역</h4>
          <input type="file" onChange={_onChange} />
        </div>
        <div className="viewer">
          {csvData.slice(0, 10).map((data, index) => {
            const calc = lineCalculator(data);

            console.log(calc);
            if (!calc) return;

            return (
              <div key={index} className="group">
                <span>{calc.min}</span>
                <span>{calc.max}</span>
                <span>{calc.sum}</span>
                <span>{calc.avg}</span>
                <span className="std">{calc.std}</span>
                <span>{calc.median}</span>
              </div>
            );
          })}
        </div>
        <div className="calculate">계산결과</div>
      </Problem1Style>
      ;
    </>
  );
}
