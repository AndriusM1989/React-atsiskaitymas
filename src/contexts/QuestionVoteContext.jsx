import { createContext, useEffect, useReducer } from "react";

const QuestionVoteContext = createContext();
const QuestionVoteActionTypes = {
  get_all: "get all QuestionVote from db",
  add: "add one new questionVote",
};

const reducer = (state, action) => {
  switch (action.type) {
    case QuestionVoteActionTypes.get_all:
      return action.data;
    case QuestionVoteActionTypes.add:
      fetch(`http://localhost:8080/questionVotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
  }
};

const QuestionVoteProvider = ({ children }) => {
  const [questionVote, setVote] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/questionVotes`)
      .then((res) => res.json())
      .then((data) =>
        setVote({
          type: QuestionVoteActionTypes.get_all,
          data: data,
        })
      );
  }, []);

  return (
    <QuestionVoteContext.Provider
      value={{
        questionVote,
        setVote,
        QuestionVoteActionTypes,
      }}
    >
      {children}
    </QuestionVoteContext.Provider>
  );
};

export { QuestionVoteProvider };
export default QuestionVoteContext;
