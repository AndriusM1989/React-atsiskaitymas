import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const StyledSelectedQuestion = styled.div``;
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
  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <StyledSelectedQuestion>
          <h1>{data.name}</h1>
          <div>
            <p>Asked on: {data.postDate}</p>
            <p>modified on:</p>
          </div>
          <p>{data.description}</p>
          <div>
            <p>answer count:</p>
          </div>
          <div>
            <div>
              <p>{data.answer.userId}</p>
              <p>{data.answer.answerDate}</p>
            </div>
            <p>{data.answer.answer}</p>
          </div>
        </StyledSelectedQuestion>
      )}
    </>
  );
};

export default QuestionAnswer;
