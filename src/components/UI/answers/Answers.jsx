import styled from "styled-components";
import AnswerContext from "../../../contexts/AnswerContext";
import UserContext from "../../../contexts/UsersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import VotesContext from "../../../contexts/VotesContext";
import { v4 as uuid } from "uuid";

const StyledAnswers = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  > div {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }
`;

const Answers = ({ data }) => {
  const { setAnswer, AnswerActionTypes } = useContext(AnswerContext);
  const { loggedInUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { answerVote } = useContext(VotesContext);

  const filteredData = Object.values(answerVote).filter((item) => {
    return item.answerId === data.id;
  });

  const { setVote, VotesActionTypes } = useContext(VotesContext);
  const handleOnclick = () => {
    const finalValues = {
      id: uuid(),
      answerId: data.id,
      votes: 1,
      userName: loggedInUser.userName,
    };
    setVote({
      type: VotesActionTypes.add,
      data: finalValues,
    });
    navigate(`/questionAnswer/${id}`);
    console.log(finalValues);
  };

  return (
    <StyledAnswers>
      <h5>{data.userName}</h5>
      <p>{data.answer}</p>
      <div>
        <p>{new Date(data.answerDate).toLocaleDateString()}</p>
        {!loggedInUser ? (
          <p>Log in to vote</p>
        ) : (
          <button onClick={handleOnclick}>Add Vote</button>
        )}
        <p>
          Votes:{" "}
          {
            filteredData.map((votes) => {
              return <div key={votes.voteId} data={votes}></div>;
            }).length
          }
        </p>
      </div>
      {loggedInUser.userName === data.userName && (
        <div>
          <button
            onClick={() => {
              setAnswer({ type: AnswerActionTypes.remove, id: id });
              navigate("/");
            }}
          >
            Delete
          </button>
        </div>
      )}
    </StyledAnswers>
  );
};

export default Answers;
