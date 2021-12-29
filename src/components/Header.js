import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
const StyledLink = styled(Link)`
  font-size: 13px;
  padding: 7px 7px 0 15px;
`;

function Header() {
  return (
    <Container>
      <LeftBox to="/">
        <AiFillHome size={40} />
      </LeftBox>
      <RightBox>
        <UserBox to="/mypage">
          <Avatar icon={<UserOutlined />} />
        </UserBox>
        <StyledLink to="/login">logout</StyledLink>
      </RightBox>
    </Container>
  );
}

export default Header;
