import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function dummyLayout(props) {
  return props?.children || null;
}

function AppRoute({
  component: Component,
  layout,
  checkSession,
  isPublic,
  ...rest
} = {}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const Layout = layout || dummyLayout;
        const { pathname, key } = rest?.location || {};

        return (
          <>
            {!isPublic ? (
              <PrivateRoute>
                <Layout>
                  <Component {...props} refreshKey={key} />
                </Layout>
              </PrivateRoute>
            ) : (
              <PublicRoute withSessionCheck={checkSession} key={pathname}>
                <Layout>
                  <Component {...props} />
                </Layout>
              </PublicRoute>
            )}
          </>
        );
      }}
    />
  );
}

AppRoute.propTypes = {
  isPublic: PropTypes.bool,
  checkSession: PropTypes.bool,
  layout: PropTypes.any,
  component: PropTypes.any,
};

AppRoute.defaultProps = {
  isPublic: false,
  checkSession: false,
  layout: void 0,
  component: void 0,
};

export default AppRoute;
