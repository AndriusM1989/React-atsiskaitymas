import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/header/Header";
import Main from "./components/pages/main/Main";
import QuestionAnswer from "./components/pages/questionAnswer/QuestionAnswer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/questionAnswer">
          <Route path=":id" element={<QuestionAnswer />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
