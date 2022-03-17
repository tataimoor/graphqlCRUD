import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { CommentSection } from "./pages/Comments";
import { Modal } from "./components/Modal";

function App() {
  console.log(import.meta.env);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/comments" element={<CommentSection />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
