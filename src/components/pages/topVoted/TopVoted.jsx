import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import QuestionContext from "../../../contexts/QuestionContext";
import QuestionCard from "../../UI/questionCard/questionCard";

const StyledMain = styled.main`
  > div {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      >a{
        text-decoration: none;
      }
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
  }
`;

const Main = () => {
  const { question } = useContext(QuestionContext);
  const sortedQuestions = question.sort((a, b) => b.votes - a.votes);

  return (
    <StyledMain>
      <div>
        <h1>Top Voted Questions</h1>
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
          <NavLink
            to="/addQuestion"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Ask something
          </NavLink>
        </div>
      </div>
      <div>
        {sortedQuestions.map((questions) => {
          return <QuestionCard key={questions.id} data={questions} />;
        })}
      </div>
    </StyledMain>
  );
};

export default Main;
