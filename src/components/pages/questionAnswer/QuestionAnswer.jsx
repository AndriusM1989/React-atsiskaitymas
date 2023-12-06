import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { useContext } from "react";
import QuestionContext from "../../../contexts/QuestionContext";
import UsersContext from "../../../contexts/UsersContext";

const StyledSelectedQuestion = styled.main`
  > div.question {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
  const { setQuestion, QuestionActionTypes } = useContext(QuestionContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (!data.name) {
          navigate("/");
        }
        setQuestion(data);
      });
  }, []);

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
            <h3>{data.description}</h3>
            <div>
              <p>Answer count: {data.answers.length}</p>
              {loggedInUser.id === data.userId && (
                <div>
                  <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                  <button
                    onClick={() => {
                      setQuestion({ type: QuestionActionTypes.remove, id: id });
                      navigate("/");
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="answer">
            {data.answers.length
              ? data.answers.map((answer) => (
                  <Answer key={answer.id} data={answer} />
                ))
              : "No comments so far..."}
          </div>
        </StyledSelectedQuestion>
      )}
    </>
  );
};

export default QuestionAnswer;
