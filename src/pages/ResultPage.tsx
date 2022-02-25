import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { LocationType } from "interfaces/interfaces";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Script = styled.div`
  width: 75%;
  border-radius: 5px;
  border: 1px solid lightgrey;
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
const StyledVideoTitle = styled.p`
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const ResultPage: React.FC = () => {
  const { state } = useLocation();
  const ref = useRef<HTMLVideoElement>(null);
  const [youtubeSrc, setYoutubeSrc] = useState("");
  const [youtubeTime, setYoutubeTime] = useState(0);
  const [videoSrc, setVideoSrc] = useState("");
  const [vttSrc, setVttSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [scriptText, setScriptText] = useState<
    { time: string; text: string }[]
  >([]);

  const _handleTimeline = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const input = e.target as HTMLElement;
    const timeArr = input.innerText.split(":");
    if (ref.current) {
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
    }
  };
  const _handleYoutubeTimeline = (
    e: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    const input = e.target as HTMLElement;
    const timeArr = input.innerText.split(":");
    if (timeArr.length === 3) {
      const hour = Number(timeArr[0]) * 3600;
      const min = Number(timeArr[1]) * 60;
      const sec = Number(timeArr[2]);
      setYoutubeTime(hour + min + sec);
    } else {
      const min = Number(timeArr[0]) * 60;
      const sec = Number(timeArr[1]);
      setYoutubeTime(min + sec);
    }
  };

  useEffect(() => {
    const { type, title, url, script } = state as LocationType;
    if (type === 1) {
      setVideoSrc(url);
      setVttSrc(
        "https://s3-sowooju-caption-an2.s3.ap-northeast-2.amazonaws.com/test.vtt",
      );
    } else {
      setYoutubeSrc(url);
    }
    setVideoTitle(title);
    setScriptText(script);
  }, []);

  return (
    <Container>
      <StyledVideoTitle>{videoTitle}</StyledVideoTitle>
      {youtubeSrc ? (
        <iframe
          width="75%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeSrc}?autoplay=1&start=${youtubeTime}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      ) : (
        <video controls width="50%" height="100%" ref={ref} crossOrigin="true">
          <source src={videoSrc} type="video/mp4" />
          <track
            kind="captions"
            src={vttSrc}
            label="폐쇄형 자막"
            default={true}
          ></track>
        </video>
      )}
      <Script>
        {scriptText.map((script) => (
          <ScriptBox key={script.time}>
            <StyledScriptTime
              onClick={youtubeSrc ? _handleYoutubeTimeline : _handleTimeline}
            >
              {script.time}
            </StyledScriptTime>
            &nbsp;&nbsp;
            <StyledScriptText>{script.text}</StyledScriptText>
          </ScriptBox>
        ))}
      </Script>
    </Container>
  );
};

export default ResultPage;
