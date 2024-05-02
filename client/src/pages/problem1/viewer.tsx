import styled from '@emotion/styled';
import { lineCalculator } from './util';

interface ViewerProps {
  csvData: string[];
}
export default function Viewer(props: ViewerProps) {
  return (
    <ViewerStyle className="viewer">
      {props.csvData.slice(0, 300).map((data, index) => {
        // {csvData.map((data, index) => {
        const calc = lineCalculator(data);

        if (calc.error) {
          console.log('error', index, calc.error);
          return;
        }

        return (
          <div key={index} className="group">
            test
            <span>{calc.min}</span>
            <span>{calc.max}</span>
            <span>{calc.sum}</span>
            <span>{calc.avg}</span>
            <span className="std">{calc.std}</span>
            <span>{calc.median}</span>
          </div>
        );
      })}
    </ViewerStyle>
  );
}

const ViewerStyle = styled.div`
  margin-top: 20px;
  background-color: pink;

  max-height: calc(100vh - 400px);
  /* max-height: 200px; */
  overflow: auto;
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
  }
`;
