import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const Content = styled.div`
  margin: 50px 30px;
`;

interface BoxType {
  imgType: string;
}

const InfoBox: React.FC<BoxType> = ({ imgType, children }) => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc("/icon/" + imgType + ".png");
  }, []);

  return (
    <Container>
      {imgType === "ai" ? (
        <>
          <Content>{children}</Content>
          <img src={imgSrc} width={300} />
        </>
      ) : (
        <>
          <img src={imgSrc} width={300} />
          <Content>{children}</Content>
        </>
      )}
    </Container>
  );
};

export default InfoBox;
