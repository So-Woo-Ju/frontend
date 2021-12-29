import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

function Mypage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos([
      { id: 1, title: "Video1", thumbnail: "" },
      { id: 2, title: "Video2", thumbnail: "" },
      { id: 3, title: "Video3", thumbnail: "" },
      { id: 4, title: "Video4", thumbnail: "" },
      { id: 5, title: "Video5", thumbnail: "" },
      { id: 6, title: "Video6", thumbnail: "" },
    ]);
  }, []);

  return (
    <Container>
      <h2 style={{ fontWeight: "bold" }}>자막이 생성된 미디어</h2>
      <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
        {videos.map((video) => (
          <StyledLink to="/result">
            <Col id={video.id} style={{ display: "flex", width: 460 }}>
              <img
                alt={video.id}
                height="160"
                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fvckff%2FbtqCjeJmBHM%2FtMVpe4aUIMfH4nKS4aO3tK%2Fimg.jpg"
              />
              <VideoTitle>{video.title}</VideoTitle>
            </Col>
          </StyledLink>
        ))}
      </Row>
    </Container>
  );
}

export default Mypage;
