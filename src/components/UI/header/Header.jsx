import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";
import QuestionContext from "../../../contexts/QuestionContext";

const StyledHeader = styled.header`
  background-color: #040809;
  padding: 2rem;
  color: #fff;
  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    padding-bottom: 3rem;
    > h1 {
      max-width: 800px;
      color: red;
    }
    > ul {
      display: flex;
      gap: 1rem;
      > li {
        list-style: none;
        > a {
          text-decoration: none;
          color: #fff;
        }
      }
    }
    > div.userInfo {
      height: 250px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > img {
        height: 100%;
      }
      >div{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
  > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > nav {
      > ul {
        display: flex;
        gap: 1rem;
        > li {
          list-style: none;
          > a {
            text-decoration: none;
            color: #fff;
          }
          >a.active {
            color: green;
          }
        }
      }
    }
    >a{
      text-decoration: none;
      color: #fff;
    }
    >a.active {
            color: green;
          }
  }
`;

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  const { question } = useContext(QuestionContext);
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div>
        <div className="logo">
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp3192b8G7NQxdA98_PU9yfDKgyhgH0CnmkJYRMNQ5nwOtUgV5soO2qf7C5NUIceo8v3c&usqp=CAU"
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
            <img
              src={loggedInUser.profilePicture}
              alt={`${loggedInUser.userName} profile picture`}
            />
            <div>
              <span>{loggedInUser.userName}</span>
              <button
                onClick={() => {
                  setLoggedInUser("");
                  navigate("/");
                }}
              >
                LogOut
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Newest
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/popular"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/answeredQuestions"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Answered
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/unAnsweredQuestions"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Unanswered
              </NavLink>
            </li>
          </ul>
        </nav>

        {!loggedInUser ? (
          <p>Log in to ask a question</p>
        ) : (
          <NavLink
            to="/addQuestion"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Ask something
          </NavLink>
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
