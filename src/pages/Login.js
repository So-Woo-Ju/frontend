import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../modules/user";
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
const SocialLoginBox = styled.div`
  display: flex;
`;
const SocialLoginButton = styled.div`
  cursor: pointer;
  margin: 10px;
`;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const _handleSubmit = () => {
    dispatch(login(user));
    navigate("/");
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
          <SocialLoginBox>
            <SocialLoginButton>
              <img alt="google" src="/google_login.png" width="150" />
            </SocialLoginButton>
            <SocialLoginButton>
              <img alt="kakao" src="/kakao_login.png" width="150" />
            </SocialLoginButton>
          </SocialLoginBox>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default Login;
