import styled from "styled-components";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import QuestionContext from "../../../contexts/QuestionContext";
import QuestionCard from "../../UI/questionCard/questionCard";

const StyledMain = styled.main`
  > div > div {
    display: flex;
    > nav {
      > ul {
        display: flex;
        gap: 1rem;
        > li {
          list-style: none;
          > a {
            text-decoration: none;
          }
        }
      }
    }
  }
`;

const Main = () => {
  const { question } = useContext(QuestionContext);

  return (
    <StyledMain>
      <div>
        <h1>All Questions</h1>
        <div>
          <h3>23420394 questions</h3>
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
                  to="/topVoted"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Top voted
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div>
        {question.map((questions) => {
          return <QuestionCard key={questions.id} data={questions} />;
        })}
      </div>
    </StyledMain>
  );
};

export default Main;
