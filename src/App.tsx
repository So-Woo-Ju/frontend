import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components";
import { MainPage, ResultPage, Login, Signup, Mypage, ErrorPage } from "pages";
import { getAccessToken, logout } from "lib/api/user";
import Cookies from "universal-cookie";
import { QueryClientProvider, QueryClient } from "react-query";
import About from "pages/About";
import { LoginContext } from "contexts";

const cookies = new Cookies();
const queryClient = new QueryClient();

const App: React.FC = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);

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
      <div
        style={{
          height: window.innerHeight,
          fontFamily: "Noto Sans KR, sans-serif",
        }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              isLogin === true ? <MainPage /> : <Navigate replace to="/login" />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={isLogin === true ? <Navigate replace to="/" /> : <Login />}
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
