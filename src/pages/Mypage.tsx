import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { load } from "../modules/media";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 5%;
`;
const VideoTitle = styled.p`
  font-size: 20px;
  margin-left: 20px;
`;
const StyledLink = styled(Link)`
  color: black;
  :hover {
    color: gray;
  }
`;

interface MediaType {
  id: number;
  src: string;
  videoName: string;
  videoUrl: string;
  videoType: string;
  videoLanguage: string;
}

function Mypage() {
  const dispatch = useDispatch();
  /*
  const { media, user } = useSelector(({ media, user }) => ({
    media: media.media,
    user: user.user,
  }));*/
  const media: MediaType[] = [];
  const user: any = {};

  useEffect(() => {
    dispatch(load(user));
  }, [dispatch, user]);

  return (
    <Container>
      <h2 style={{ fontWeight: "bold" }}>자막이 생성된 미디어</h2>
      <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
        {media &&
          media.map((video: MediaType) => (
            <StyledLink to="/result" key={video.id}>
              <Col
                id={String(video.id)}
                style={{ display: "flex", width: 460 }}
              >
                <img
                  alt={String(video.id)}
                  height="160"
                  src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fvckff%2FbtqCjeJmBHM%2FtMVpe4aUIMfH4nKS4aO3tK%2Fimg.jpg"
                />
                <VideoTitle>{video.videoName}</VideoTitle>
              </Col>
            </StyledLink>
          ))}
      </Row>
    </Container>
  );
}

export default Mypage;
