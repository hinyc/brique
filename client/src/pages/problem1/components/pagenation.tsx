import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';

interface PageNationProps {
  size: number;
  totalItems: number;
  setRange: React.Dispatch<
    React.SetStateAction<{ start: number; end: number }>
  >;
}

export default function PageNation(props: PageNationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Array.from(
    { length: Math.ceil(props.totalItems / props.size) },
    (_, i) => i + 1
  );

  const pageChanger = useCallback((page: number) => {
    props.setRange({
      start: (page - 1) * props.size,
      end: page * props.size
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pageChanger(currentPage);
  }, [currentPage, pageChanger]);

  return (
    <PageNationStyle>
      <div className="pages">
        {pages.map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
      </div>
      <span className="notification">
        *좌우 스크롤을 통해 페이지를 선택하세요.
      </span>
    </PageNationStyle>
  );
}

const PageNationStyle = styled.div`
  width: 600px;
  max-width: 600px;
  .pages {
    padding: 10px 0;
    display: flex;
    overflow: auto;
    button {
      min-width: 20px;
      width: 20px;
      height: 30px;
      align-items: center;
      padding: 0;
      margin: 0 4px;
      transition: 0.1s;
      :hover {
        transform: scale(1.2);
      }
      :active {
        transform: scale(1.05);
      }
    }
  }
  .notification {
    margin-top: 10px;
    font-size: 12px;
    color: gray;
  }
`;
