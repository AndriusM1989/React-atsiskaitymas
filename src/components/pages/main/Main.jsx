import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import QuestionContext from "../../../contexts/QuestionContext";
import QuestionCard from "../../UI/questionCard/questionCard";
import UsersContext from "../../../contexts/UsersContext";
import { click } from "@testing-library/user-event/dist/click";

const StyledMain = styled.main`
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

const Main = () => {
  const { question } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UsersContext);
  const sortedQuestions = question.sort((a, b) => {
    return new Date(b.postDate) - new Date(a.postDate);
  });

  return (
    <StyledMain>
      <div>
        <h1>Newest Questions</h1>
        <h3>{question.length} questions</h3>
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
