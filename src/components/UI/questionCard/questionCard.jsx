import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <StyledCard>
      <div>
        <p>Votes: {data.votes}</p>
        <p>Answers: </p>
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
