import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/header/Header";
import Main from "./components/pages/main/Main";

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route index element={<Main />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
