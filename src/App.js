import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Loading from "./pages/Loading";

function App() {
  return (
    <div style={{ height: window.innerHeight }}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
