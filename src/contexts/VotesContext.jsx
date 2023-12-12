import { createContext, useEffect, useReducer } from "react";

const VotesContext = createContext();
const VotesActionTypes = {
  get_all: "get all answerVotes from db",
  add: "add one new answerVote",
};

const reducer = (state, action) => {
  switch (action.type) {
    case VotesActionTypes.get_all:
      return action.data;
    case VotesActionTypes.add:
      fetch(`http://localhost:8080/answerVotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
  }
};

const VotesProvider = ({ children }) => {
  const [answerVote, setVote] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/answerVotes`)
      .then((res) => res.json())
      .then((data) =>
        setVote({
          type: VotesActionTypes.get_all,
          data: data,
        })
      );
  }, []);

  return (
    <VotesContext.Provider
      value={{
        answerVote,
        setVote,
        VotesActionTypes,
      }}
    >
      {children}
    </VotesContext.Provider>
  );
};

export { VotesProvider };
export default VotesContext;
