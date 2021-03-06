import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "lib/api/user";
import { LoginContext } from "contexts";

const Header: React.FC = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const _handleLogout = useCallback((): void => {
    logout();
    setIsLogin(false);
    navigate("/login");
  }, [navigate, setIsLogin]);

  return (
    <Container>
      <LeftBox>
        <BoxContent to="/">Home</BoxContent>
        <BoxContent to="/about">About</BoxContent>
      </LeftBox>
      <RightBox>
        {isLogin === true && (
          <>
            <UserBox to="/mypage">
              <Avatar icon={<UserOutlined />} />
            </UserBox>
            <StyledLogout type="link" onClick={_handleLogout}>
              logout
            </StyledLogout>
          </>
        )}
      </RightBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 70px;
  border-bottom: 1px solid lightgrey;
`;
const LeftBox = styled.div`
  margin-top: 20px;
  margin-left: 35px;
`;
const BoxContent = styled(Link)`
  font-weight: bold;
  font-size: 17px;
  color: gray;
  :hover {
    color: darkgray;
  }
  & + & {
    margin-left: 25px;
  }
`;
const RightBox = styled.div`
  position: absolute;
  right: 0;
  margin: 17px 20px;
`;
const UserBox = styled(Link)`
  color: black;
  :hover {
    color: gray;
  }
`;
const StyledLogout = styled(Button)`
  font-size: 13px;
  padding: 7px 7px 0 15px;
`;

export default Header;
