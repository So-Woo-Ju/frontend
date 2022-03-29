import React, { useState, useCallback } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signup, mailCheck, checkNumber } from "lib/api/user";
import { useMutation } from "react-query";
import styled from "styled-components";
import { UserType } from "interfaces/interfaces";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const mutationMailCheck = useMutation((email: string) => mailCheck(email));
  const mutationCheckNumber = useMutation(
    (check: { email: string; code: string }) => checkNumber(check),
  );
  const mutationSignup = useMutation((user: UserType) => signup(user));

  const [user, setUser] = useState({ email: "", password: "" });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [number, setNumber] = useState("");
  const [canSignup, setCanSignup] = useState(false);

  const _handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user],
  );
  const _handlePwdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPasswordConfirm(e.target.value);
    },
    [],
  );
  const _handleEmailCheck = useCallback((): void => {
    if (!user.email) {
      notification.open({
        message: "이메일을 입력해주세요",
      });
    } else {
      mutationMailCheck
        .mutateAsync(user.email)
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
          } else {
            notification.open({
              message: "인증메일 전송 중 오류가 발생했습니다",
            });
          }
        });
    }
  }, [mutationMailCheck, user.email]);
  const _checkNumber = useCallback((): void => {
    if (!user.email) {
      notification.open({
        message: "이메일을 입력해주세요",
      });
    } else if (!number) {
      notification.open({
        message: "인증 번호를 입력해주세요",
      });
    } else {
      mutationCheckNumber
        .mutateAsync({ email: user.email, code: number })
        .then(() => {
          notification.open({
            message: "메일 인증이 완료되었습니다",
          });
          setCanSignup(true);
        })
        .catch(() => {
          notification.open({
            message: "유효하지 않은 번호입니다",
          });
          setCanSignup(false);
        });
    }
  }, [mutationCheckNumber, number, user.email]);
  const _handleNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNumber(e.target.value);
    },
    [],
  );

  const _handleSubmit = useCallback((): void => {
    if (canSignup) {
      mutationSignup
        .mutateAsync(user)
        .then(() => {
          notification.open({
            message: "회원가입에 성공했습니다",
            description: "로그인을 진행해주세요",
          });
          navigate("/login");
        })
        .catch(() => {
          notification.open({
            message: "회원가입에 실패했습니다",
            description: "다시 시도해주세요",
          });
        });
    } else if (!canSignup) {
      setErrorMessage("메일 인증을 완료해주세요");
    }
  }, [canSignup, mutationSignup, navigate, user]);

  return (
    <Container>
      <Form onFinish={_handleSubmit} autoComplete="off">
        <StyledCheckButton
          type="link"
          onClick={_handleEmailCheck}
          disabled={mutationMailCheck.isLoading}
        >
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
        <StyledCheckButton
          type="link"
          onClick={_checkNumber}
          disabled={mutationCheckNumber.isLoading}
        >
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
              disabled={mutationSignup.isLoading}
            >
              로그인하기
            </StyledButton>
            <StyledButton
              type="primary"
              htmlType="submit"
              size="large"
              disabled={mutationSignup.isLoading}
            >
              회원가입
            </StyledButton>
          </ButtonBox>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 85%;
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
  margin-bottom: -5%;
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

export default React.memo(Signup);
