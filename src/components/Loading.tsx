import React from "react";
import { Spin } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <Spin
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 50 }} />}
      />
    </Container>
  );
};

export default Loading;
