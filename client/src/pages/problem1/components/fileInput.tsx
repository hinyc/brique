import styled from '@emotion/styled';
import React from 'react';

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput(props: FileInputProps) {
  return (
    <UploadButton>
      <input type="file" id="file" onChange={props.onChange} />
      <label htmlFor="file">CSV 파일을 선택해주세요.</label>
    </UploadButton>
  );
}

const UploadButton = styled.div`
  transition: 0.2s;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }

  input[type='file'] {
    display: none;
  }

  label {
    padding: 15px;
    background-color: #00456f;
    border-radius: 8px;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
`;
