import React from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";

import Logo from "assets/icons/icon.svg";
import history from "constants/history";
import SvgIcon from "components/ui-kit/SvgIcon/SvgIcon";

const Sidebar = ({ tabs }) => {
  const theme = useTheme();

  const handleTabClick = (path) => () => {
    history.push(path);
  };

  const renderTabs = () => {
    return tabs.map((item, index) => {
      const { pathname } = history?.location;
      const { title, path, icon, isHidden } = item;
      const isActive = path === pathname;

      if (isHidden) {
        return null;
      }

      return (
        <Item key={index} onClick={handleTabClick(path)} isActive={isActive}>
          <SvgIcon type={icon} />
          <Title isActive={isActive}>{title}</Title>
        </Item>
      );
    });
  };

  return (
    <Wrapper theme={theme}>
      <Icon src={Logo} />
      <Menu>{renderTabs()}</Menu>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: ${(p) => p.theme.settings.sideMenuWidth};
  min-height: 100vh;
  background-color: #252836;
`;

const Icon = styled.img`
  width: 60px;
  margin-top: 10px;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 25px;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: ${(p) =>
    p.isActive ? p.theme.accentColor : "transparent"};
  transition: background-color 200ms;
  &:hover {
    cursor: pointer;
    background-color: #ff9300;
  }
`;

const Title = styled.p`
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  color: ${(p) => (p.isActive ? "#23262A" : "#fff")};
`;

Sidebar.propTypes = {
  tabs: PropTypes.array.isRequired,
};

export default Sidebar;
