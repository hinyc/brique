import { lineCalculator } from '../util';
import styled from '@emotion/styled';

interface ViewerProps {
  range: { start: number; end: number };

  csvData: string[][];
}

export const Viewer = (props: ViewerProps) => {
  //render 최적화를 위해 10000개만 렌더링
  return (
    <ViewerStyle className="viewer">
      <div className="group column">
        <span>최대값</span>
        <span>최솟값</span>
        <span>합계</span>
        <span>평균</span>
        <span className="std">표준편차</span>
        <span>중간값</span>
      </div>

      <div className="list">
        {props.csvData
          .slice(props.range.start, props.range.end)
          .map((data, index) => {
            const calc = lineCalculator(data);

            if (calc.error) {
              return;
            }

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
    </ViewerStyle>
  );
};

export const ViewerStyle = styled.div`
  width: 600px;
  margin-top: 20px;
  padding: 16px;
  max-height: calc(100vh - 500px);
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  /* max-height: 200px; */
  .list {
    overflow: auto;
    max-height: calc(100vh - 530px);
  }
  .group {
    width: 100%;
    display: flex;

    width: 100%;
    justify-content: space-around;
    span {
      display: block;
      width: 60px;
      background-color: white;
      &.std {
        width: 200px;
      }
    }

    &.column {
      border-bottom: 1px solid lightgray;
    }
  }
`;
