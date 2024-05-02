import styled from '@emotion/styled';

interface BoxProps {
  title: string;
  list: string[];
}
export default function Box(props: BoxProps) {
  return (
    <BoxStyle>
      <h4>{props.title}</h4>

      <div className="list">
        {props.list.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </BoxStyle>
  );
}

const BoxStyle = styled.div`
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
`;
