import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { LocationType } from "interfaces/interfaces";
import { ScriptContainer } from "components";

const ResultPage: React.FC = () => {
  const { state } = useLocation();
  const ref = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
  const [videoSrc, setVideoSrc] = useState("");
  const [vttSrc, setVttSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [scriptText, setScriptText] = useState<
    { id: number; start: string; end: string; text: string }[]
  >([]);

  const convertTime = useCallback((arr: Array<string>): number => {
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
  }, []);
  const _handleTimeline = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>): void => {
      const input = e.target as HTMLElement;
      const timeArr = input.innerText.split(":");
      if (ref.current) {
        ref.current.currentTime = convertTime(timeArr);
      }
    },
    [convertTime],
  );

  useEffect(() => {
    const { title, url, script, vtt } = state as LocationType;
    setVideoSrc(url);
    setVttSrc(vtt);
    setVideoTitle(title);
    setScriptText(script);
  }, [state]);

  return (
    <Container>
      <StyledVideoTitle>{videoTitle}</StyledVideoTitle>

      <video
        controls
        width="40%"
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
      <Script>
        {scriptText.map((script) => (
          <ScriptContainer
            key={script.id}
            script={script}
            currentTime={currentTime}
            handleTimeline={_handleTimeline}
            convertTime={convertTime}
          />
        ))}
      </Script>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 90vh;
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
const StyledVideoTitle = styled.p`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
`;

export default React.memo(ResultPage);
