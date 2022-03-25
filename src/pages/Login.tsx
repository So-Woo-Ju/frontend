import React, { Dispatch, SetStateAction, useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { googleLogin, kakaoLogin, login } from "lib/api/user";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { useMutation } from "react-query";
import { UserType } from "interfaces/interfaces";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Container = styled.div`
  height: 80%;
  margin: 2% 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledButton = styled(Button)`
  width: 130px;
`;
const SocialLoginButton = styled.div`
  cursor: pointer;
  margin-top: 10px;
`;
const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ErrorMessage = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  font-size: 13px;
  color: red;
`;

interface LoginType {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FunctionComponent<LoginType> = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const mutationLogin = useMutation((user: UserType) => login(user));
  const mutationGoogle = useMutation((token: string) => googleLogin(token));
  const mutationKakao = useMutation((token: string) => kakaoLogin(token));

  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const _handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user],
  );

  const setToken = useCallback((data: any) => {
    const refresh_token = data.refreshToken;
    const access_token = data.accessToken;
    const token_exp = data.tokenExp;
    cookies.set("token_exp", token_exp, {
      expires: new Date(token_exp),
    });
    cookies.set("access_token", access_token, {
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });
    cookies.set("refresh_token", refresh_token, {
      expires: new Date(token_exp),
    });
  }, []);
  const _handleSubmit = useCallback(() => {
    mutationLogin
      .mutateAsync(user)
      .then((res) => {
        if (res.data.success) {
          setIsLogin(true);
          setToken(res.data.data);
        }
      })
      .catch(() => {
        setErrorMsg("로그인에 실패했습니다");
      });
  }, [mutationLogin, setIsLogin, setToken, user]);
  const _handleGoogleSuccess = useCallback(
    (token: any) => {
      mutationGoogle
        .mutateAsync(token.tokenObj.id_token)
        .then((res) => {
          if (res.data.success) {
            setIsLogin(true);
            setToken(res.data.data);
          }
        })
        .catch(() => {
          setErrorMsg("로그인에 실패했습니다");
        });
    },
    [mutationGoogle, setIsLogin, setToken],
  );
  const _handleGoogleFailure = useCallback(() => {
    console.log("Google Login Failure");
  }, []);
  const _handleKakaoSuccess = useCallback(
    (token: any) => {
      mutationKakao
        .mutateAsync(token.response.access_token)
        .then((res) => {
          if (res.data.success) {
            setIsLogin(true);
            setToken(res.data.data);
          }
        })
        .catch(() => {
          setErrorMsg("로그인에 실패했습니다");
        });
    },
    [mutationKakao, setIsLogin, setToken],
  );
  const _handleKakaoFailure = useCallback(() => {
    console.log("Kakao Login Failure");
  }, []);

  return (
    <Container>
      <Form onFinish={_handleSubmit} autoComplete="off">
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요" },
            {
              type: "email",
              message: "이메일을 정확히 입력해주세요",
            },
          ]}
        >
          <Input
            name="email"
            value={user.email}
            onChange={_handleChange}
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}
        >
          <Input.Password
            name="password"
            value={user.password}
            onChange={_handleChange}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <ErrorMessage>{errorMsg}</ErrorMessage>
          <ButtonBox>
            <StyledButton
              type="link"
              size="large"
              onClick={() => {
                navigate("/signup");
              }}
              disabled={mutationLogin.isLoading}
            >
              회원가입하기
            </StyledButton>
            <StyledButton
              type="primary"
              htmlType="submit"
              size="large"
              disabled={mutationLogin.isLoading}
            >
              로그인
            </StyledButton>
          </ButtonBox>
          <SocialButtons>
            <SocialLoginButton>
              <GoogleLogin
                buttonText="    Sign up with Google    "
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
                onSuccess={_handleGoogleSuccess}
                onFailure={_handleGoogleFailure}
                disabled={mutationLogin.isLoading}
              />
            </SocialLoginButton>
            <SocialLoginButton>
              <KakaoLogin
                token={process.env.REACT_APP_KAKAO_TOKEN || ""}
                onSuccess={_handleKakaoSuccess}
                onFail={_handleKakaoFailure}
                render={({ onClick }) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      if (!mutationLogin.isLoading) {
                        onClick();
                      }
                    }}
                  >
                    <img
                      alt="kakao"
                      src="/kakao_login_medium_wide.png"
                      width={250}
                    />
                  </div>
                )}
              />
            </SocialLoginButton>
          </SocialButtons>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default React.memo(Login);
