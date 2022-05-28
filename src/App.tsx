import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Board } from "./components/Board";
import { CardDetails } from "./components/CardDetails";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:boardId" element={<Board />}>
          <Route path="list/:listId/card/:cardId" element={<CardDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
