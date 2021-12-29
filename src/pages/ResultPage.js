import { useState, useRef, useEffect } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Script = styled.div`
  width: 90%;
  height: 85%;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-left: 5%;
  margin-top: 10px;
  padding: 15px;
  overflow: scroll;
`;
const ScriptBox = styled.div`
  display: flex;
`;
const StyledScriptText = styled.p``;
const StyledScriptTime = styled.p`
  color: #1890ff;
  cursor: pointer;
`;

function ResultPage() {
  const ref = useRef();
  const [videoSrc, setVideoSrc] = useState("");
  const [scriptText, setScriptText] = useState([]);

  const _handleTimeline = (e) => {
    const timeArr = e.target.innerText.split(":");
    if (timeArr.length === 3) {
      const hour = Number(timeArr[0]) * 3600;
      const min = Number(timeArr[1]) * 60;
      const sec = Number(timeArr[2]);
      ref.current.currentTime = hour + min + sec;
    } else {
      const min = Number(timeArr[0]) * 60;
      const sec = Number(timeArr[1]);
      ref.current.currentTime = min + sec;
    }
  };

  useEffect(() => {
    setVideoSrc("/video.mp4");
    setScriptText([
      { time: "0:00", text: "시작해요?" },
      { time: "0:03", text: "어... 안녕, 안녕하세요. 제 이름은 최웅이에요." },
      { time: "0:09", text: "(하품소리)" },
      { time: "0:13", text: "카메라 보지마요." },
      { time: "0:14", text: "자꾸 신경 쓰이는데." },
      { time: "0:16", text: "카메라가 없다고 생각해요." },
      { time: "0:19", text: "근데 바로 옆에 있는데 어떻게 없다고 생각해요." },
      { time: "0:21", text: "보다시피 어.. 촬영 당하고 있어요." },
      { time: "0:25", text: "멍청아, 앞에나 봐." },
      { time: "0:31", text: "혼자가 아니라" },
      { time: "0:33", text: "얼빵하게 보지말고 앞이나 보라고." },
      { time: "0:36", text: "재수없는 애랑 같이요." },
      { time: "0:38", text: "제 이름은 국연수예요." },
      { time: "0:41", text: "처음 최웅을 본 건 1학년 때인가." },
      { time: "0:51", text: "선생님." },
      { time: "0:52", text: "응." },
      { time: "0:53", text: "최웅이 누구예요?" },
      { time: "0:54", text: "이번 달에도 걔가 1등이에요?" },
    ]);
  }, []);

  return (
    <Container>
      <Row xs={1} md={2}>
        <Col
          style={{ marginTop: 20, paddingLeft: "5%" }}
          xs={{ span: 24 }}
          md={{ span: 12 }}
        >
          <video controls width="95%" ref={ref}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 12 }}
          style={{ height: window.innerHeight }}
        >
          <Script>
            {scriptText.map((script) => (
              <ScriptBox key={script.time}>
                <StyledScriptTime onClick={_handleTimeline}>
                  {script.time}
                </StyledScriptTime>
                &nbsp;&nbsp;
                <StyledScriptText>{script.text}</StyledScriptText>
              </ScriptBox>
            ))}
          </Script>
        </Col>
      </Row>
    </Container>
  );
}

export default ResultPage;
