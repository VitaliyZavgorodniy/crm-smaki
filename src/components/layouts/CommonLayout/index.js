import { connect, useSelector } from "react-redux";
import { compose } from "redux";

import navTabsByRole from "constants/navigation";
import history from "constants/history";
import withRedicrect from "pages/withRedirect";
import { default as CommonLayout } from "./CommonLayout";

function mapStateToProps(state) {
  const { user } = state?.user;
  const { pathname } = history?.location;

  const tabs = navTabsByRole[user?.role_name];

  const activeTabIndex = tabs.findIndex((tab) => pathname.includes(tab.path));
  const allowedPaths = tabs.map((el) => el.path);
  const isRedirect = activeTabIndex < 0 || !allowedPaths.includes(pathname);

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
)(CommonLayout);
