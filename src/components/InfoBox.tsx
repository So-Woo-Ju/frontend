import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { Row, Col } from "antd";

interface BoxType {
  imgType: string;
}

const InfoBox: React.FC<BoxType> = ({ imgType, children }) => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc("/icon/" + imgType + ".png");
  }, [imgType]);

  return (
    <Container>
      <Fade>
        {imgType === "ai" ? (
          <Row>
            <StyledCol>
              <Content>{children}</Content>
            </StyledCol>
            <StyledCol>
              <StyledImg src={imgSrc} />
            </StyledCol>
          </Row>
        ) : (
          <Row>
            <StyledCol>
              <StyledImg src={imgSrc} />
            </StyledCol>
            <StyledCol>
              <Content>{children}</Content>
            </StyledCol>
          </Row>
        )}
      </Fade>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
const Content = styled.div`
  margin: 50px 30px;
`;
const StyledCol = styled(Col)`
  width: 50%;
  min-width: 300px;
`;
const StyledImg = styled.img`
  width: 50%;
  min-width: 300px;
  margin: 0 30px;
`;

export default InfoBox;
