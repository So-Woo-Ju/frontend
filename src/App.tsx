import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import ErrorPage from "./pages/Errorpage";
import { getAccessToken, logout } from "./lib/api/user";
import Cookies from "universal-cookie";
import { QueryClientProvider, QueryClient } from "react-query";

const cookies = new Cookies();
const queryClient = new QueryClient();

interface ResponseType {
  message: string;
  data?: string;
}

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (cookies.get("access_token")) {
      setIsLogin(true);
    } else {
      const res = getAccessToken();
      if (res.includes("expires")) {
        logout();
      } else {
        setIsLogin(true);
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ height: window.innerHeight }}>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route
            path="/"
            element={
              isLogin === true ? <MainPage /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              isLogin === true ? (
                <Navigate replace to="/" />
              ) : (
                <Login setIsLogin={setIsLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLogin === true ? <Navigate replace to="/" /> : <Signup />
            }
          />
          <Route
            path="/result"
            element={
              isLogin === true ? (
                <ResultPage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/mypage"
            element={
              isLogin === true ? <Mypage /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/error"
            element={
              isLogin === true ? (
                <ErrorPage />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={
              isLogin === true ? (
                <Navigate replace to="/" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
