import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Loading from "./pages/Loading";
import ResultPage from "./pages/ResultPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import ErrorPage from "./pages/Errorpage";
import { useSelector, useDispatch } from "react-redux";
import { logout, renewalExpires } from "./modules/user";
import { RootState } from "./modules";
import { getAccessToken } from "./lib/api/user";
import Cookies from "universal-cookie";
import { QueryClientProvider, QueryClient } from "react-query";

const cookies = new Cookies();
const queryClient = new QueryClient();

interface ResponseType {
  message: string;
  data?: string;
}

const App = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const tokenExp = useSelector((state: RootState) => state.user.tokenExp);

  const [response, setResponse] = useState<ResponseType>({ message: "" });

  useEffect(() => {
    if (isLogin) {
      setResponse(getAccessToken(tokenExp));
    }
  }, [cookies.get("access_token"), cookies.get("refresh_token")]);
  useEffect(() => {
    if (response.message) {
      if (response.message.includes("expires")) {
        dispatch(logout());
      } else if (response.message.includes("renewal")) {
        dispatch(renewalExpires(response.data));
      }
    }
  }, [dispatch, response]);

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
            path="/loading"
            element={
              isLogin === true ? <Loading /> : <Navigate replace to="/login" />
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
