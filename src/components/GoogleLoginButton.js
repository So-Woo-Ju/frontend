import styled from "styled-components";

const Container = styled.div`
  width: 250px;
  border: 1px solid #4285f4;
  border-radius: 3px;
  display: flex;
`;
const ImgBox = styled.div`
  margin: 4px 10px 7px 10px;
`;
const TextBox = styled.div`
  width: 100%;
  background-color: #4285f4;
  text-align: center;
`;
const LoginText = styled.p`
  margin-top: 4px;
  margin-bottom: -2px;
  color: white;
`;

function GoogleLoginButton() {
  return (
    <Container>
      <ImgBox>
        <img alt="google" width="20px" src="/google-logo.png" />
      </ImgBox>
      <TextBox>
        <LoginText>Sign in with Google</LoginText>
      </TextBox>
    </Container>
  );
}

export default GoogleLoginButton;
