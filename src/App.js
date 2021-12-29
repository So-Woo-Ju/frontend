import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Loading from "./pages/Loading";
import ResultPage from "./pages/ResultPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import ErrorPage from "./pages/Errorpage";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  useEffect(() => {
    console.log("refresh");
  });

  return (
    <div style={{ height: window.innerHeight }}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user === null ? <Navigate replace to="/login" /> : <MainPage />
          }
        />
        <Route
          path="/login"
          element={user === null ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/signup"
          element={user === null ? <Signup /> : <Navigate replace to="/" />}
        />
        <Route
          path="/loading"
          element={
            user === null ? <Navigate replace to="/login" /> : <Loading />
          }
        />
        <Route
          path="/result"
          element={
            user === null ? <Navigate replace to="/login" /> : <ResultPage />
          }
        />
        <Route
          path="/mypage"
          element={
            user === null ? <Navigate replace to="/login" /> : <Mypage />
          }
        />
        <Route
          path="/error"
          element={
            user === null ? <Navigate replace to="/login" /> : <ErrorPage />
          }
        />
        <Route
          path="*"
          element={
            user === null ? (
              <Navigate replace to="/login" />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
