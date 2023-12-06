import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { useContext } from "react";
import QuestionContext from "../../../contexts/QuestionContext";
import UsersContext from "../../../contexts/UsersContext";
import Answers from "../../UI/answers/Answers";
import AnswerContext from "../../../contexts/AnswerContext";
import AddAnswer from "../addAnswer/AddAnswer";

const StyledSelectedQuestion = styled.main`
  > div.question {
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  > div.answer {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    gap: 10px;
  }
`;
const QuestionAnswer = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const { setQuestion, QuestionActionTypes } = useContext(QuestionContext);
  const { answer } = useContext(AnswerContext);
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

  const questionId = id;

  const filteredAnswers = answer.filter((answer) => {
    return answer.questionId === questionId;
  });

  const sortedAnswers = filteredAnswers.sort((a, b) => {
    return new Date(b.answerDate) - new Date(a.answerDate);
  });

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <StyledSelectedQuestion>
          <div className="question">
            <h1>{data.title}</h1>
            <div>
              <p>Asked on: {data.postDate.substring(0, 10)}</p>
              <p>Modified on:</p>
            </div>
            <h3>{data.description}</h3>
            <div>
              <p>Answer count: {filteredAnswers.length} </p>
              {loggedInUser.userName === data.userName && (
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
            {sortedAnswers.map((answer) => {
              return <Answers key={answer.id} data={answer} />;
            })}
          </div>
          {!loggedInUser ? (
            <p>Log in to answer</p>
          ) : (
            <div>
            <AddAnswer/>
          </div>
          )}
          
        </StyledSelectedQuestion>
      )}
    </>
  );
};

export default QuestionAnswer;
