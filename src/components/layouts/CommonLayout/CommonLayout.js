import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import history from "constants/history";

import Navigation from "./navigation/Navigation";
import ErrorWindow from "components/errorWindow/ErrorWindow";

const CommonLayout = ({ children, user, tabs }) => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState(null);

  useEffect(
    () => setActiveTab(history?.location.pathname),
    [history?.location?.pathname]
  );

  return (
    <>
      <Navigation user={user} tabs={tabs} activeTab={activeTab} />
      {/* <ErrorWindow /> */}
      <Container theme={theme}>{children}</Container>
    </>
  );
};

const Container = styled.section`
  width: 100vw;
  min-height: calc(100vh - 50px);
  padding: 15px 10px 0px;
`;

export default React.memo(CommonLayout);
