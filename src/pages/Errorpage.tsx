import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { AiFillWarning } from "react-icons/ai";

const ErrorPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("동영상을 불러올 수 없습니다");
  }, []);

  return (
    <Container>
      <AiFillWarning size={50} />
      <StyledErrorMsg>{errorMessage}</StyledErrorMsg>
    </Container>
  );
};

const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StyledErrorMsg = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding: 15px;
`;

export default ErrorPage;
