import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <NavBarStyle>
      <Link to="/">홈</Link>
      <Link to="/problem1">문제1</Link>
      <Link to="/problem2">문제2</Link>
      <Link to="/problem3">문제3</Link>
      <Link to="/problem4">문제4</Link>
      <Link to="/problem5">문제5</Link>
      <Link to="/problem6">문제6</Link>
    </NavBarStyle>
  );
}

const NavBarStyle = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  a {
    padding: 4px 16px;
    color: #000;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: 0.2s;
    :hover {
      background-color: #f0f0f0;
    }
    :active {
      box-shadow: none;
    }
  }
`;
