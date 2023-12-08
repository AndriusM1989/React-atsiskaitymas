import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import QuestionContext from "../../../contexts/QuestionContext";
import QuestionCard from "../../UI/questionCard/questionCard";
import UsersContext from "../../../contexts/UsersContext";
import QuestionVoteContext from "../../../contexts/QuestionVoteContext";
import AnswerContext from "../../../contexts/AnswerContext";

const StyledPopular = styled.main`
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

const Popular = () => {
  const { loggedInUser } = useContext(UsersContext);
  const { question } = useContext(QuestionContext);
  const { answer } = useContext(AnswerContext);

const questionsWithAnswers = question.map((q) => {
  q.answers = answer.filter((a) => a.questionId === q.id);
  return q;
});

const sortedQuestions = questionsWithAnswers.sort((a, b) => {
  return b.answers.length - a.answers.length;
});


  return (
    <StyledPopular>
      <div>
        <h1>Popular Questions</h1>
        <h3>{question.length} questions</h3>
      </div>
      <div>
        {sortedQuestions.map((questions) => {
          return <QuestionCard key={questions.id} data={questions} />;
        })}
      </div>
    </StyledPopular>
  );
};

export default Popular;
