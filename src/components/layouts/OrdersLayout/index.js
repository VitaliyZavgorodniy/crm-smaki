import { connect } from "react-redux";
import { compose } from "redux";

import navTabsByRole from "constants/navigation";
import history from "constants/history";
import { userSelector } from "selectors/user";
import withRedicrect from "pages/withRedirect";
import { default as OrdersLayout } from "./OrdersLayout";

function mapStateToProps(state) {
  const user = userSelector(state);
  const tabs = NAVIGATION_TABS[user?.role_name];
  const { pathname } = history?.location;
  const activeTabIndex = tabs.findIndex((tab) => pathname.includes(tab.path));
  const allowebPaths = tabs.map((el) => el.path);
  const isRedirect = activeTabIndex < 0 || !allowebPaths.includes(pathname);

  return {
    tabs,
    user,
    isRedirect,
    urlToRedirect: tabs[0].path,
  };
}

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRedicrect
)(OrdersLayout);
