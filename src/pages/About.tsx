import React from "react";
import { InfoBox, CcInfoBox } from "components";
import styled from "styled-components";

const About = () => {
  return (
    <div>
      <br />
      <Title>배리어프리 자막 서비스</Title>
      <CcInfoBox />
      <hr style={{ margin: 20 }} />
      <div>
        <br />
        <Title>서비스 처리 과정</Title>
        <InfoBox imgType="video">
          <ProcTitle>영상 입력</ProcTitle>
          <ProcContent>유튜브 링크 및 로컬 파일을 입력합니다</ProcContent>
        </InfoBox>
        <InfoBox imgType="ai">
          <ProcTitle>인공지능 처리</ProcTitle>
          <ProcContent>
            약 0분 간 인공지능을 사용해 폐쇄형 자막이 생성됩니다
          </ProcContent>
        </InfoBox>
        <InfoBox imgType="cc">
          <ProcTitle>자막 및 스크립트 출력</ProcTitle>
          <ProcContent>
            생성된 폐쇄형 자막 및 스크립트가 화면에 출력됩니다
          </ProcContent>
          <ProcRef>
            * 유튜브 링크가 주어진 경우 영상 내 자막이 제공되지 않습니다
          </ProcRef>
        </InfoBox>
      </div>
    </div>
  );
};

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 50px;
`;
const ProcTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ProcContent = styled.p`
  font-size: 16px;
`;
const ProcRef = styled.p`
  font-size: 13px;
  color: gray;
`;

export default About;
