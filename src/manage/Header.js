import React from "react";
import styled from "styled-components";
import { Link, useMatch } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  background-color: #21201e;
  color: white;
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: right;
`;

const Items = styled.ul`
  display: flex;
  .small {
    font-size: 13px;
  }
`;

const Item = styled.li`
  margin-left: 20px;
  align-self: flex-end;
  position: relative;
  transition: color 0.3s ease-in-out;

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
  }
  &:hover {
    color: ${(props) => props.theme.mainColor};
  }
`;

const MainMenu = styled.div`
  display: flex;
`;

const Logo = styled.span`
  font-size: 25px;
  margin-right: 20px;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.mainColor};
`;

const Header = () => {
  const reservationMatch = useMatch("/reservation");
  const registerMatch = useMatch("/register");
  return (
    <Nav>
      <TopMenu>
        <Items>
          <Item className="small">로그인</Item>
          <Item className="small">회원가입</Item>
        </Items>
      </TopMenu>
      <MainMenu>
        <Items>
          <Logo>FOODING</Logo>
          <Item>
            <Link to="/reservation">
              예약 관리{reservationMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>

          <Item>
            <Link to="/register">
              매장 등록{registerMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>테이블 현황</Item>
          <Item>사용자 데이터</Item>
        </Items>
      </MainMenu>
    </Nav>
  );
};

export default Header;
