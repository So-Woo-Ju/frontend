import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { AiFillHome } from "react-icons/ai";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Container = styled.div`
  height: 50px;
  border-bottom: 1px solid lightgrey;
`;
const LeftBox = styled(Link)`
  color: black;
  margin: 5px;
  cursor: pointer;
  :hover {
    color: gray;
  }
`;
const RightBox = styled.div`
  display: flex;
  float: right;
  margin: 7px 10px -7px 0;
  cursor: pointer;
`;
const UserBox = styled(Link)`
  color: black;
  display: flex;
  :hover {
    color: gray;
  }
`;
const StyledLogout = styled(Button)`
  font-size: 13px;
  padding: 7px 7px 0 15px;
`;

interface HeaderType {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FunctionComponent<HeaderType> = ({
  isLogin,
  setIsLogin,
}) => {
  const _handleLogout = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    setIsLogin(false);
  };

  return (
    <Container>
      <LeftBox to="/">
        <AiFillHome size={40} />
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

export default Header;
