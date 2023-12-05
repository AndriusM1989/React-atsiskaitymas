import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const StyledSelectedQuestion = styled.div`
  background-color: #fafafa;
  > div :first-child{
    color: red;
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
        <p>{data.userId}</p>
        <p>{data.answer}</p>
        <p>{data.answerDate.substring(0, 10)}</p>
        <p>{data.votes}</p>
      </div>
    );
  }

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <StyledSelectedQuestion>
          <div>
            <h1>{data.name}</h1>
            <div>
              <p>Asked on: {data.postDate.substring(0, 10)}</p>
              <p>modified on:</p>
            </div>
            <p>{data.description}</p>
            <div>
              <p>answer count:</p>
            </div>
          </div>
          <div>
            {data.answers.map((answer) => (
              <Answer key={answer.id} data={answer} />
            ))}
          </div>
        </StyledSelectedQuestion>
      )}
    </>
  );
};

export default QuestionAnswer;
