import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
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
const StyledCheckButton = styled(Button)`
  float: right;
`;

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const _handlePwdChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const _handleSubmit = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Form onFinish={_handleSubmit} autoComplete="off">
        <StyledCheckButton type="link">중복확인</StyledCheckButton>
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
          rules={[
            { required: true, message: "비밀번호를 입력해주세요" },
            {
              type: "string",
              min: 7,
              message: "비밀번호를 7자 이상 입력해주세요",
            },
          ]}
        >
          <Input.Password
            name="password"
            value={user.password}
            onChange={_handleChange}
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: "비밀번호를 한번 더 입력해주세요",
            },
            () => ({
              validator(_, value) {
                if (!value || value === user.password) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("비밀번호가 다릅니다."));
              },
            }),
          ]}
        >
          <Input.Password
            value={passwordConfirm}
            onChange={_handlePwdChange}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <ButtonBox>
            <StyledButton
              type="link"
              size="large"
              onClick={() => navigate("/login")}
            >
              로그인하기
            </StyledButton>
            <StyledButton type="primary" htmlType="submit" size="large">
              회원가입
            </StyledButton>
          </ButtonBox>
        </Form.Item>
      </Form>
    </Container>
  );
}

export default Signup;
