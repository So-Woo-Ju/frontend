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
import { getAccessToken } from "./lib/api/user";

function App() {
  const { login } = useSelector(({ user }) => ({
    login: user.login,
  }));

  useEffect(() => {
    getAccessToken();
  });

  return (
    <div style={{ height: window.innerHeight }}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            login === true ? <MainPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/login"
          element={login === true ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={login === true ? <Navigate replace to="/" /> : <Signup />}
        />
        <Route
          path="/loading"
          element={
            login === true ? <Loading /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/result"
          element={
            login === true ? <ResultPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/mypage"
          element={
            login === true ? <Mypage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/error"
          element={
            login === true ? <ErrorPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="*"
          element={
            login === true ? (
              <Navigate replace to="/" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
