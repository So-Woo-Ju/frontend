import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const Content = styled.div`
  margin: 50px 30px;
`;
const Box = styled.div`
  display: flex;
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
      <Fade>
        {imgType === "ai" ? (
          <Box>
            <Content>{children}</Content>
            <img src={imgSrc} width={300} />
          </Box>
        ) : (
          <Box>
            <img src={imgSrc} width={300} />
            <Content>{children}</Content>
          </Box>
        )}
      </Fade>
    </Container>
  );
};

export default InfoBox;
