import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/header/Header";
import Main from "./components/pages/main/Main";
import QuestionAnswer from "./components/pages/questionAnswer/QuestionAnswer";
import Popular from "./components/pages/popular/Popular";
import TopVoted from "./components/pages/topVoted/TopVoted";
import AddQuestion from "./components/pages/addQuestion/AddQuestion";
import EditQuestion from "./components/pages/editQuestion/EditQuestion";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/topVoted" element={<TopVoted />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/questionAnswer">
          <Route path=":id" element={<QuestionAnswer />} />
        </Route>
        <Route path="edit/:id" element={<EditQuestion />} />
        <Route path="/user">
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
