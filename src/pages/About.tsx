import React from "react";
import InfoBox from "../components/InfoBox";
import styled from "styled-components";

const ProcTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ProcContent = styled.p`
  width: 400px;
  font-size: 16px;
`;
const ProcRef = styled.p`
  font-size: 13px;
  color: gray;
`;

const About = () => {
  return (
    <div>
      <InfoBox imgType="video">
        <ProcTitle>영상 입력</ProcTitle>
        <ProcContent>유튜브 링크 및 로컬 파일을 입력합니다</ProcContent>
      </InfoBox>
      <InfoBox imgType="ai">
        <ProcTitle>인공지능 처리</ProcTitle>
        <ProcContent>
          약 0분 간 인공지능을 사용해 입력된 영상에 따른 폐쇄형 자막이
          생성됩니다
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
  );
};

export default About;
