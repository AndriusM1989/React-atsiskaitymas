import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";

const StyledHeader = styled.header`
  height: 100px;
  display: flex;
  justify-content: center;
  > div {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > a > img {
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
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div className="logo">
        <Link to="/">
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/37/35/q-and-a-speech-bubbles-green-violet-balloons-vector-38793735.jpg"
            alt="logo"
          />
        </Link>
      </div>
      <h1>Bets place to find your answer and discuss on relevent topics.</h1>
      {!loggedInUser ? (
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
      ) : (
        <div className="userInfo">
          {loggedInUser.role === "admin" && (
            <Link to="/user/manage">Manage Users</Link>
          )}
          <Link to="/user/page">
            <img
              src={loggedInUser.profilePicture}
              alt={`${loggedInUser.userName} profile picture`}
            />
            <span>{loggedInUser.userName}</span>
          </Link>
          <button
            onClick={() => {
              setLoggedInUser("");
              navigate("/");
            }}
          >
            LogOut
          </button>
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
