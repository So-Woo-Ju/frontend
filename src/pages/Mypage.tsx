import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { load } from "../lib/api/media";
import { useQuery } from "react-query";
import styled from "styled-components";
import { VideoType } from "../interfaces/interfaces";
import { useCallback } from "react";
import ErrorPage from "./Errorpage";
import Loading from "components/Loading";

const Container = styled.div`
  width: 90%;
  margin: 4% 5%;
`;
const VideoTitle = styled.div`
  width: 50%;
  font-size: 20px;
  margin-left: 20px;
`;
const StyledLink = styled.div`
  color: black;
  display: flex;
  :hover {
    color: gray;
  }
  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 50%;
`;

const Mypage = () => {
  const { status, data } = useQuery(["loadMedia"], () => load(""));
  const navigate = useNavigate();

  const _handleNavigate = () => {
    navigate("/result", {
      state: { type: 2, title: "title", url: "url", script: [] },
    });
  };
  const renderByStatus = useCallback(() => {
    switch (status) {
      case "loading":
        return <Loading />;
      case "error":
        return <ErrorPage />;
      default:
        return (
          <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
            {data?.data?.map((video: VideoType) => (
              <Col id={String(video.id)} xs={24} md={12} lg={8}>
                <StyledLink onClick={_handleNavigate} key={video.id}>
                  <StyledImg
                    alt={String(video.id)}
                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fvckff%2FbtqCjeJmBHM%2FtMVpe4aUIMfH4nKS4aO3tK%2Fimg.jpg"
                  />
                  <VideoTitle>{video.videoName}</VideoTitle>
                </StyledLink>
              </Col>
            ))}
          </Row>
        );
    }
  }, [data?.data, status]);

  return (
    <Container>
      <h2 style={{ fontWeight: "bold" }}>자막이 생성된 미디어</h2>
      {renderByStatus()}
    </Container>
  );
};

export default Mypage;
