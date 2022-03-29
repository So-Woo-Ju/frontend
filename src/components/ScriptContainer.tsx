import React, { useCallback } from "react";
import { ScriptType } from "../interfaces/interfaces";
import styled from "styled-components";

const ScriptContainer = ({
  script,
  currentTime,
  handleTimeline,
  convertTime,
}: ScriptType) => {
  const _setHighlight = useCallback(
    (curTime: number | undefined, start: string, end: string) => {
      const timeArrStart = start.split(":");
      const timeArrEnd = end.split(":");
      let startTime = convertTime(timeArrStart);
      let endTime = convertTime(timeArrEnd);
      return endTime >= (curTime || 0) && startTime <= (curTime || 0);
    },
    [convertTime],
  );

  return (
    <ScriptBox key={script.start}>
      <StyledScriptTime onClick={handleTimeline}>
        {script.start}
      </StyledScriptTime>
      &nbsp;&nbsp;
      <StyledScriptText
        isHighlight={_setHighlight(currentTime, script.start, script.end)}
        isNonVerb={script.text.startsWith("(")}
      >
        {script.text}
      </StyledScriptText>
    </ScriptBox>
  );
};

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

export default ScriptContainer;
