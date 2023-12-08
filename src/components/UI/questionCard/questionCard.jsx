import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import QuestionVoteContext from "../../../contexts/QuestionVoteContext";
import { v4 as uuid } from "uuid";
import AnswerContext from "../../../contexts/AnswerContext";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;

const QuestionCard = ({ data }) => {
  const { setVote, QuestionVoteActionTypes } = useContext(QuestionVoteContext);
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { questionVote } = useContext(QuestionVoteContext);
  const { answer } = useContext(AnswerContext);

  const filteredData = Object.values(questionVote).filter((item) => {
    return item.questionId === data.id;
  });
  const handleOnclick = () => {
    const finalValues = {
      id: uuid(),
      questionId: data.id,
      votes: 1,
      userName: loggedInUser.userName,
    };
    setVote({
      type: QuestionVoteActionTypes.add,
      data: finalValues,
    });
    navigate(`/`);
  };

  const filteredAnswer = Object.values(answer).filter((item) => {
    return item.questionId === data.id;
  });

  return (
    <StyledCard>
      <div>
        <div>
          <p>{new Date(data.postDate).toLocaleString()}</p>
          <p>
            Votes:{" "}
            {
              filteredData.map((votes) => {
                return <div key={votes.voteId} data={votes}></div>;
              }).length
            }
          </p>
          <div>
            {!loggedInUser ? (
              <p>Log in to vote</p>
            ) : (
              <button onClick={handleOnclick}>Add Vote</button>
            )}
          </div>
        </div>
        <p>
          Answers: {" "}
          {
            filteredAnswer.map((answers) => {
              return <div key={answers.questionId} data={answers}></div>;
            }).length
          }
        </p>
      </div>
      <div>
        <h4>
          <Link
            to={`/questionAnswer/${data.id}`}
            style={{
              color: "unset",
              textDecoration: "unset",
            }}
          >
            {data.title}
          </Link>
        </h4>
        <p>{data.description}</p>
      </div>
      <div>
        <p>Author: {data.userName}</p>
      </div>
    </StyledCard>
  );
};

export default QuestionCard;
