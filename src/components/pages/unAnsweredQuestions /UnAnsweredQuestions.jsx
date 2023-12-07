import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import QuestionContext from "../../../contexts/QuestionContext";
import QuestionCard from "../../UI/questionCard/questionCard";
import UsersContext from "../../../contexts/UsersContext";
import AnswerContext from "../../../contexts/AnswerContext";

const StyledUnAnsweredQuestions = styled.main`
  > div:first-child {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > a {
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
            > a.active {
              color: red;
            }
          }
        }
      }
    }
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const UnAnsweredQuestions = () => {
  const { question } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UsersContext);
  const { answer } = useContext(AnswerContext);

  const questionsWithAnswers = question.map((q) => {
    q.answers = answer.filter((a) => a.questionId === q.id);
    return q;
  });
  const questionsWithNoAnswers = questionsWithAnswers.filter(
    (q) => q.answers.length === 0
  );

  return (
    <StyledUnAnsweredQuestions>
      <div>
        <h1>Un Answered Questions</h1>
        <div>
          <h3>{question.length} questions</h3>
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
                  Un Answered
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
      </div>
      <div>
        {questionsWithNoAnswers.map((questions) => {
          return <QuestionCard key={questions.id} data={questions} />;
        })}
      </div>
    </StyledUnAnsweredQuestions>
  );
};

export default UnAnsweredQuestions;
