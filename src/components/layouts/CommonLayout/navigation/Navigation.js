import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { NavLink } from "./NavLink";
import SearchBar from "./SearchBar";

import history from "constants/history";

import Icon from "assets/icons/icon.svg";

const Navigation = ({ user, tabs, activeTab }) => {
  const theme = useTheme();
  
  const handleLink = (path) => history.push(path);

  const renderMenu = () => {
    return tabs.map((item, index) => {
      const { title, path, isHidden } = item;
      const isActive = path === activeTab;

      if (isHidden) return null;
      else
        return (
          <Item key={index}>
            <NavLink
              title={title}
              path={path}
              isActive={isActive}
              onClick={() => handleLink(path)}
            />
          </Item>
        );
    });
  };

  return (
    <Wrapper theme={theme}>
      <Container>
        <NavBar>
          <Logo src={Icon} />
          <Menu>{tabs && renderMenu()}</Menu>
        </NavBar>

        <SearchBar user={user} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background-color: ${(p) => p.theme.background};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Menu = styled.ul`
  display: flex;
  height: 100%;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default React.memo(Navigation);
