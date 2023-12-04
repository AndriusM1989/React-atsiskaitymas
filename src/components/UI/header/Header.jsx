import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  max-width: 1440px;
  height: 100px;
  display: flex;
  justify-content: center;
  > div {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > img {
      width: 100%;
    }
  }
  > h1 {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    text-align: center;
  }
  > ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 200px;
    > li {
      list-style: none;
      a {
        text-decoration: none;
      }
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="logo">
        <img
          src="https://cdn.vectorstock.com/i/preview-1x/37/35/q-and-a-speech-bubbles-green-violet-balloons-vector-38793735.jpg"
          alt="logo"
        />
      </div>
      <h1>Bets place to find your answer and discuss on relevent topics.</h1>
      <ul>
        <li>
          <NavLink
            to="/user/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </StyledHeader>
  );
};

export default Header;
