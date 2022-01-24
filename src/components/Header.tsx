import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../modules/user";
import { Button } from "antd";
import { AiFillHome } from "react-icons/ai";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { RootState } from "modules";

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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.user.login);

  const _handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <LeftBox to="/">
        <AiFillHome size={40} />
      </LeftBox>
      <RightBox>
        {login === true && (
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
