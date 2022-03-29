import React, { useCallback, Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { googleLogin, kakaoLogin } from "lib/api/user";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import styled from "styled-components";

interface SocialLoginType {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setToken: (data: any) => void;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const SocialLogin: React.FunctionComponent<SocialLoginType> = ({
  setIsLogin,
  setToken,
  setErrorMsg,
  isLoading,
}) => {
  const mutationGoogle = useMutation((token: string) => googleLogin(token));
  const mutationKakao = useMutation((token: string) => kakaoLogin(token));

  const _handleGoogleSuccess = useCallback(
    (token: any) => {
      mutationGoogle
        .mutateAsync(token.tokenObj.id_token)
        .then((res) => {
          if (res.data.success) {
            setIsLogin(true);
            setToken(res.data.data);
          }
        })
        .catch(() => {
          setErrorMsg("로그인에 실패했습니다");
        });
    },
    [mutationGoogle, setErrorMsg, setIsLogin, setToken],
  );
  const _handleGoogleFailure = useCallback(() => {
    console.log("Google Login Failure");
  }, []);
  const _handleKakaoSuccess = useCallback(
    (token: any) => {
      mutationKakao
        .mutateAsync(token.response.access_token)
        .then((res) => {
          if (res.data.success) {
            setIsLogin(true);
            setToken(res.data.data);
          }
        })
        .catch(() => {
          setErrorMsg("로그인에 실패했습니다");
        });
    },
    [mutationKakao, setErrorMsg, setIsLogin, setToken],
  );
  const _handleKakaoFailure = useCallback(() => {
    console.log("Kakao Login Failure");
  }, []);

  return (
    <SocialButtons>
      <SocialLoginButton>
        <GoogleLogin
          buttonText="    Sign up with Google    "
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
          onSuccess={_handleGoogleSuccess}
          onFailure={_handleGoogleFailure}
          disabled={isLoading}
        />
      </SocialLoginButton>
      <SocialLoginButton>
        <KakaoLogin
          token={process.env.REACT_APP_KAKAO_TOKEN || ""}
          onSuccess={_handleKakaoSuccess}
          onFail={_handleKakaoFailure}
          render={({ onClick }) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                if (!isLoading) {
                  onClick();
                }
              }}
            >
              <img alt="kakao" src="/kakao_login_medium_wide.png" width={250} />
            </div>
          )}
        />
      </SocialLoginButton>
    </SocialButtons>
  );
};

const SocialLoginButton = styled.div`
  cursor: pointer;
  margin-top: 10px;
`;
const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default React.memo(SocialLogin);
