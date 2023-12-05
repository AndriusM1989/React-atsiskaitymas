import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  > div:nth-child(1) {
    display: flex;
    gap: 1rem;
  }
  > div:nth-child(2) {

  }
`;

const QuestionCard = ({ data }) => {
  return (
    <StyledCard>
      <div>
        <p>Votes: {data.votes}</p>
        <p>Answers: {data.answers.length}</p>
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
            {data.name}
          </Link>
        </h4>
        <p>{data.description}</p>
      </div>
      <div>
        <p>Author: {data.userId}</p>
      </div>
    </StyledCard>
  );
};

export default QuestionCard;
