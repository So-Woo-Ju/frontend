import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../modules/user";
import GoogleLogin from "react-google-login";
import * as config from "../config";
import styled from "styled-components";

const Container = styled.div`
  height: 80%;
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

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Kakao } = window;
  const [user, setUser] = useState({ email: "", password: "" });

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const _handleSubmit = () => {
    dispatch(login(user)).then(() => {
      navigate("/");
    });
  };
  const _handleGoogleSuccess = async (res) => {
    const {
      profileObj: { email },
    } = res;
    dispatch(login({ email, password: null })).then(() => navigate("/"));
  };
  const _handleGoogleFailure = (err) => {
    console.log(err);
  };
  const _handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: config.KAKAO_REDIRECT_URI,
    });
  };

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
          <ButtonBox>
            <StyledButton
              type="link"
              size="large"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입하기
            </StyledButton>
            <StyledButton type="primary" htmlType="submit" size="large">
              로그인
            </StyledButton>
          </ButtonBox>
          <SocialButtons>
            <SocialLoginButton>
              <GoogleLogin
                buttonText="        Sign up with Google       "
                clientId={config.GOOGLE_CLIENT_ID}
                onSuccess={_handleGoogleSuccess}
                onFailure={_handleGoogleFailure}
              />
            </SocialLoginButton>
            <SocialLoginButton onClick={_handleKakaoLogin}>
              <img alt="kakao" src="/kakao_login_medium_wide.png" />
            </SocialLoginButton>
          </SocialButtons>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default Login;
