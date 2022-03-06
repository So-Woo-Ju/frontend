import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  width: 100%;
  padding: 0 15%;
`;
const Content = styled.p`
  font-size: 17px;
  font-weight: 500;
  line-height: 35px;
`;
const StrongText = styled.strong`
  border-bottom: 1px solid;
`;

const CcInfoBox = () => {
  return (
    <Container>
      <Content>
        <br />
        저희 배리어프리 자막 서비스는 폐쇄형 자막을 제공합니다. 폐쇄형 자막이란{" "}
        <StrongText>
          말소리만 옮기는 일반적 자막과 더불어 영상에 담긴 모든 소리를 담습니다.
        </StrongText>{" "}
        <br />
        이를테면 빗방울이 유리창에 부딪히는 소리, 한숨 짓는 소리, 점점 커지는
        발걸음 소리 등 음성 외의 소리까지 표현합니다. 장애인들에게는 이런 폐쇄형
        자막이 필요하지만 현재 많은 서비스들에서는 폐쇄형 자막을 제공하는데
        시간이 오래걸리거나 혹은 제공하지 않아 불편을 겪는 경우가 많습니다.
        장애인뿐만 아니라 비장애인들도 영상을 시청할 때 정확한 내용 전달을 위해
        폐쇄형 자막을 선호하는 부분이 있어 모두에게 장점을 제공할 수 있습니다.
        이러한 폐쇄형 자막은 현재 사람이 직접 만들어서 제공하는 것이라 시간과
        노력이 많이 듭니다. 저희 서비스는 자동화를 통해 빠른 폐쇄형 자막 제공을
        목표로 합니다. <br /> <br />
      </Content>
    </Container>
  );
};

export default CcInfoBox;
