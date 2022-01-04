import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../modules/user";
import * as config from "../../config";
import qs from "qs";
import { Spin } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");

  const getProfile = async () => {
    try {
      let data = await window.Kakao.API.request({ url: "/v2/user/me" });
      dispatch(login({ email: data.kakao_account.email, password: null })).then(
        () => {
          navigate("/");
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: config.KAKAO_REST_API,
      redirect_uri: config.KAKAO_REDIRECT_URI,
      code: code,
      client_secret: config.KAKAO_CLIENT_SECRET,
    });
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
      );
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(config.KAKAO_REST_API);
      }
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      getProfile();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Container>
      <Spin
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 50 }} />}
      />
    </Container>
  );
};

export default OAuth;
