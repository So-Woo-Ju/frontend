import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, mailCheck, checkNumber } from "../modules/user";
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
const ErrorMessage = styled.p`
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
  font-size: 13px;
  color: red;
`;

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isVerify } = useSelector(({ user }) => ({
    isVerify: user.isVerify,
  }));
  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [number, setNumber] = useState("");

  const _handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const _handlePwdChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const _handleEmailCheck = () => {
    dispatch(mailCheck({ email: user.email }))
      .then(() => {
        notification.open({
          message: "메일 인증번호가 전송되었습니다",
        });
      })
      .catch((err) => {
        if (err.message.includes("400")) {
          notification.open({
            message: "이미 존재하는 이메일입니다",
          });
        } else if (err.message.includes("500")) {
          notification.open({
            message: "인증메일 전송 중 오류가 발생했습니다",
          });
        }
      });
  };
  const _checkNumber = () => {
    dispatch(checkNumber({ email: user.email, code: number }))
      .then(() => {
        notification.open({
          message: "메일 인증이 완료되었습니다",
        });
      })
      .catch(() => {
        notification.open({
          message: "유효하지 않은 번호입니다",
        });
      });
  };
  const _handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const _handleSubmit = () => {
    if (isVerify === true) {
      dispatch(signup(user))
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          notification.open({
            message: "회원가입에 실패했습니다",
            description: "다시 시도해주세요",
          });
        });
    } else {
      setErrorMessage("메일 인증을 완료해주세요");
    }
  };

  return (
    <Container>
      <Form onFinish={_handleSubmit} autoComplete="off">
        <StyledCheckButton type="link" onClick={_handleEmailCheck}>
          메일인증
        </StyledCheckButton>
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
        <StyledCheckButton type="link" onClick={_checkNumber}>
          인증하기
        </StyledCheckButton>
        <Form.Item
          label="인증번호"
          name="check"
          rules={[{ required: true, message: "인증번호를 입력해주세요" }]}
        >
          <Input
            name="check"
            value={number}
            onChange={_handleNumberChange}
            size="large"
          />
        </Form.Item>
        <ErrorMessage>{errorMsg}</ErrorMessage>
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
