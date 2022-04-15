import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import history from "constants/history";
import { getDate } from "utils/helpers/date";
import { getDynamicRouteTab } from "utils/helpers/routing";
import Header from "./Header";
import Sidebar from "./Sidebar";

function OrdersLayout({ children, tabs, user }) {
  const [activeTab, setActiveTab] = useState(null);
  const date = getDate("dddd, DD MMMM");

  useEffect(() => updateActiveTab(), [history?.location?.pathname]);

  function updateActiveTab() {
    const { pathname } = history?.location;
    const tab = getDynamicRouteTab(pathname, tabs);

    setActiveTab({ ...tab });
  }

  return (
    <Wrapper>
      <Sidebar tabs={tabs} />

      <Header title={activeTab?.title} date={date} user={user} />
      <Section>{children}</Section>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  /* width: 100vw;
  min-height: 100vh; */
  position: relative;
  background-color: #fafafa;
`;

const Section = styled.section`
  width: calc(100vw - 100px);
  margin-left: 100px;
  padding: 10px;
  padding-bottom: 0;
`;

OrdersLayout.propTypes = {
  children: PropTypes.element.isRequired,
  tabs: PropTypes.array,
  user: PropTypes.object.isRequired,
};

OrdersLayout.defaultProps = {
  tabs: void 0,
};

export default React.memo(OrdersLayout);
