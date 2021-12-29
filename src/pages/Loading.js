import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/result");
    }, 3000);
  });

  return (
    <Container>
      <Spin
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 50 }} />}
      />
    </Container>
  );
}

export default Loading;
