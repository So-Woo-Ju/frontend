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
const StyledScriptText = styled.p<{ isHighlight: boolean; isNonVerb: boolean }>`
  border-bottom: ${({ isHighlight, isNonVerb }) =>
    isHighlight && isNonVerb
      ? "1px solid #1890ff"
      : isHighlight && !isNonVerb && "1px solid black"};
  font-weight: ${({ isHighlight }) => isHighlight && "bold"};
  color: ${({ isNonVerb }) => isNonVerb && "#1890ff"};
`;
const StyledScriptTime = styled.p`
  color: #1890ff;
  cursor: pointer;
`;
const StyledVideoTitle = styled.p`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const ResultPage: React.FC = () => {
  const { state } = useLocation();
  const ref = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
  const [youtubeSrc, setYoutubeSrc] = useState("");
  const [youtubeTime, setYoutubeTime] = useState(0);
  const [videoSrc, setVideoSrc] = useState("");
  const [vttSrc, setVttSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [scriptText, setScriptText] = useState<
    { start: string; end: string; text: string }[]
  >([]);

  const convertTime = (arr: Array<string>) => {
    if (arr.length === 3) {
      const hour = Number(arr[0]) * 3600;
      const min = Number(arr[1]) * 60;
      const sec = Number(arr[2]);
      return hour + min + sec;
    } else {
      const min = Number(arr[0]) * 60;
      const sec = Number(arr[1]);
      return min + sec;
    }
  };
  const _handleTimeline = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const input = e.target as HTMLElement;
    const timeArr = input.innerText.split(":");
    if (ref.current) {
      ref.current.currentTime = convertTime(timeArr);
    }
  };
  const _handleYoutubeTimeline = (
    e: React.MouseEvent<HTMLParagraphElement>,
  ) => {
    const input = e.target as HTMLElement;
    const timeArr = input.innerText.split(":");
    setYoutubeTime(convertTime(timeArr));
  };
  const _setHighlight = (
    curTime: number | undefined,
    start: string,
    end: string,
  ) => {
    const timeArrStart = start.split(":");
    const timeArrEnd = end.split(":");
    let startTime = convertTime(timeArrStart);
    let endTime = convertTime(timeArrEnd);
    return endTime >= (curTime || 0) && startTime <= (curTime || 0);
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
        ></iframe>
      ) : (
        <video
          controls
          width="50%"
          height="100%"
          ref={ref}
          crossOrigin="true"
          onTimeUpdate={() => setCurrentTime(ref.current?.currentTime)}
        >
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
          <ScriptBox key={script.start}>
            <StyledScriptTime
              onClick={youtubeSrc ? _handleYoutubeTimeline : _handleTimeline}
            >
              {script.start}
            </StyledScriptTime>
            &nbsp;&nbsp;
            <StyledScriptText
              isHighlight={
                youtubeSrc
                  ? false
                  : _setHighlight(currentTime, script.start, script.end)
              }
              isNonVerb={script.text.startsWith("(")}
            >
              {script.text}
            </StyledScriptText>
          </ScriptBox>
        ))}
      </Script>
    </Container>
  );
};

export default ResultPage;
