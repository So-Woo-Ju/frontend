import { Col, Row } from "antd";
import React, { ReactElement, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { load } from "lib/api/media";
import { useQuery } from "react-query";
import styled from "styled-components";
import { VideoType } from "interfaces/interfaces";
import ErrorPage from "pages/Errorpage";
import { Loading } from "components";
import convertScript from "util/convertScript";

const Mypage: React.FC = () => {
  const { status, data } = useQuery(["loadMedia"], () => load());
  const navigate = useNavigate();

  const _handleNavigate = useCallback(
    async (idx): Promise<void> => {
      const media = data?.data.data.medias[idx];
      const script = await (await fetch(media.textUrl)).json();
      navigate("/result", {
        state: {
          url: media.videoUrl,
          script: convertScript(script),
          title: media.videoName,
          vtt: media.captionUrl,
        },
      });
    },
    [data?.data.data.medias, navigate]
  );
  const renderByStatus = useCallback((): ReactElement => {
    switch (status) {
      case "loading":
        return <Loading />;
      case "success":
        const medias = data?.data.data.medias;
        return (
          <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
            {medias.map((video: VideoType, idx: number) => (
              <Col key={video.id} xs={24} md={12} lg={8}>
                <StyledLink onClick={() => _handleNavigate(idx)} key={video.id}>
                  <StyledImg alt={String(video.id)} src={video.thumbnailUrl} />
                  <VideoTitle>{video.videoName}</VideoTitle>
                </StyledLink>
              </Col>
            ))}
          </Row>
        );
      default:
        return <ErrorPage />;
    }
  }, [_handleNavigate, data?.data.data.medias, status]);

  return (
    <Container>
      <h2 style={{ fontWeight: "bold" }}>자막이 생성된 미디어</h2>
      {renderByStatus()}
    </Container>
  );
};

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

export default React.memo(Mypage);
