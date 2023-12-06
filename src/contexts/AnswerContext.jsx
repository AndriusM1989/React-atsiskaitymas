import { createContext, useEffect, useReducer } from "react";

const AnswerContext = createContext();
const AnswerActionTypes = {
  get_all: "get all answers from db",
  add: "add one new answer",
  remove: "remove one specific answer",
  edit: "edit one specific answer",
};

const reducer = (state, action) => {
  switch (action.type) {
    case AnswerActionTypes.get_all:
      return action.data;
    case AnswerActionTypes.add:
      fetch(`http://localhost:8080/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case AnswerActionTypes.remove:
      fetch(`http://localhost:8080/answers/${action.id}`, {
        method: "DELETE",
      });
      return state.filter((el) => el.id.toString() !== action.id.toString());
    case AnswerActionTypes.edit:
      fetch(`http://localhost:8080/answers/${action.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return state.map((el) => {
        if (el.id.toString() === action.id.toString()) {
          return { id: action.id, ...action.data };
        } else {
          return el;
        }
      });
    default:
      return state;
  }
};

const AnswerProvider = ({ children }) => {
  const [answer, setAnswer] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/answers`)
      .then((res) => res.json())
      .then((data) =>
        setAnswer({
          type: AnswerActionTypes.get_all,
          data: data,
        })
      );
  }, []);

  return (
    <AnswerContext.Provider
      value={{
        answer,
        setAnswer,
        AnswerActionTypes,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export { AnswerProvider };
export default AnswerContext;
