import { Routes, Route } from "react-router-dom";
import Home from "./home";
import AgendaPage from "./agendaPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<AgendaPage />} />
      </Routes>
    </div>
  );
}

export default App;
