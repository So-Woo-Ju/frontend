import { useState, useRef, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, kakaoLogin, googleLogin } from "../modules/user";
import styled from "styled-components";
import GoogleLoginButton from "../components/GoogleLoginButton";

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
const ErrorMessage = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  font-size: 13px;
  color: red;
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector(({ user }) => ({
    isLogin: user.login,
  }));

  const isMounted = useRef(false);

  const [user, setUser] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const _handleSubmit = () => {
    dispatch(login(user))
      .then(() => {
        if (isMounted.current) {
          setErrorMsg("");
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.message.includes("400")) {
          setErrorMsg("존재하지 않는 사용자입니다");
        }
      });
  };
  const _handleGoogleLogin = () => {
    dispatch(googleLogin());
  };
  const _handleKakaoLogin = () => {
    dispatch(kakaoLogin());
  };

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
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
            >
              회원가입하기
            </StyledButton>
            <StyledButton type="primary" htmlType="submit" size="large">
              로그인
            </StyledButton>
          </ButtonBox>
          <SocialButtons>
            <SocialLoginButton onClick={_handleGoogleLogin}>
              <GoogleLoginButton />
            </SocialLoginButton>
            <SocialLoginButton onClick={_handleKakaoLogin}>
              <img alt="kakao" src="/kakao_login_medium_wide.png" width={250} />
            </SocialLoginButton>
          </SocialButtons>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default Login;
