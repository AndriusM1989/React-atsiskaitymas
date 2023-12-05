import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const StyledSelectedQuestion = styled.main`
  > div.question {
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
  > div.answer {
    padding-left: 50px;
    > div {
      border: 1px solid black;
      border-radius: 5px;

      > div {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;
const QuestionAnswer = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  async function fetchData() {
    const res = await fetch(`http://localhost:8080/questions/${id}`);
    const data = await res.json();
    return setData(data);
  }

  function Answer({ data }) {
    return (
      <div>
        <h3>{data.userId}</h3>
        <p>{data.answer}</p>
        <div>
          <p>{data.answerDate.substring(0, 10)}</p>
          <p>{data.votes}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <StyledSelectedQuestion>
          <div className="question">
            <h1>{data.name}</h1>
            <div>
              <p>Asked on: {data.postDate.substring(0, 10)}</p>
              <p>Modified on:</p>
            </div>
            <p>{data.description}</p>
            <div>
              <p>Answer count: {data.answers.length}</p>
            </div>
          </div>
          {data.answers.length
            ? data.answers.map((answer) => (
                <Answer key={answer.id} data={answer} />
              ))
            : "No comments so far..."}
        </StyledSelectedQuestion>
      )}
    </>
  );
};

export default QuestionAnswer;
