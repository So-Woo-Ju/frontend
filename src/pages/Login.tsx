import React, { useState, useCallback, useContext } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "lib/api/user";
import styled from "styled-components";
import { useMutation } from "react-query";
import { UserType } from "interfaces/interfaces";
import { SocialLogin } from "components";
import Cookies from "universal-cookie";
import { LoginContext } from "contexts";

const cookies = new Cookies();

const Login = () => {
  const { setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const mutationLogin = useMutation((user: UserType) => login(user));

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
          <SocialLogin
            setToken={setToken}
            setErrorMsg={setErrorMsg}
            isLoading={mutationLogin.isLoading}
          />
        </Form.Item>
      </Form>
    </Container>
  );
};

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
const ErrorMessage = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  font-size: 13px;
  color: red;
`;

export default React.memo(Login);
