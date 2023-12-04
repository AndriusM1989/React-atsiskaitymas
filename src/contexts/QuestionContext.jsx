import { createContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();
const QuestionActionTypes = {
  get_all: "get all questions from db",
  add: "add one new question",
  remove: "remove one specific question",
  edit: "edit one specific question",
};

const reducer = (state, action) => {
  switch (action.type) {
    case QuestionActionTypes.get_all:
      return action.data;
    case QuestionActionTypes.add:
      fetch(`http://localhost:8080/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case QuestionActionTypes.remove:
      fetch(`http://localhost:8080/questions/${action.id}`, {
        method: "DELETE",
      });
      return state.filter((el) => el.id.toString() !== action.id.toString());
    case QuestionActionTypes.edit:
      fetch(`http://localhost:8080/questions/${action.id}`, {
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
      // jei nepavyko atlikti šių sąlygų, tai reikia atspausdinti į konsolę
      console.log("error: action type not found", action.type);
      return state;
  }
};

const QuestionProvider = ({ children }) => {
  const [question, setQuestion] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
      .then((res) => res.json())
      .then((data) =>
        setQuestion({
          type: QuestionActionTypes.get_all,
          data: data,
        })
      );
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        question,
        setQuestion,
        QuestionActionTypes,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider };
export default QuestionContext;
