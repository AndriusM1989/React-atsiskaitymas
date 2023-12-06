import styled from "styled-components";
import AnswerContext from "../../../contexts/AnswerContext";
import UserContext from "../../../contexts/UsersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import VotesContext from "../../../contexts/VotesContext";
import VoteCard from "../vote/VoteCard";

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

  console.log(data.id);

  return (
    <StyledAnswers>
      <h5>{data.userName}</h5>
      <p>{data.answer}</p>
      <div>
        <p>{new Date(data.answerDate).toLocaleDateString()}</p>
        {filteredData.map((votes) => {
          return <VoteCard key={votes.voteId} data={votes} />;
        })}
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
