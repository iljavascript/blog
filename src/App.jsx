import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Moment from "./pages/Moment";
import Note from "./pages/Note";
import Demo from "./pages/Demo";
import Tool from "./pages/Tool";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

import "./styles/index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moment/*" element={<Moment />} />
        <Route path="/note/*" element={<Note />} />
        <Route path="/demo/*" element={<Demo />} />
        <Route path="/tool/*" element={<Tool />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;