import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../modules/user";
import { Spin } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(login({ email: "mail@gmail.com", password: "qlalfqjsgh" })).then(
      () => {
        navigate("/");
      },
    );
  }, []);

  return (
    <Container>
      <Spin
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 50 }} />}
      />
    </Container>
  );
};

export default OAuth;
