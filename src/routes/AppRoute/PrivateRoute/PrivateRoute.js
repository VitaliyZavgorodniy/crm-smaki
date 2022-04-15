import PropTypes from "prop-types";
import { useEffect } from "react";

import LoadingScreen from "components/ui-kit/LoadingScreen";

function PrivateRoute({
  children,
  isUserLoggedIn,
  isSessionChecked,
  logout,
  checkSession,
  jwt,
}) {
  useEffect(() => {
    if (isSessionChecked && !isUserLoggedIn) {
      logout();
    }

    if (!isUserLoggedIn) {
      checkCurrentSession();
    }
  }, [isSessionChecked, isUserLoggedIn]);

  async function checkCurrentSession() {
    try {
      await checkSession();
    } catch (error) {
      logout();
    }
  }

  if (!jwt) {
    return <LoadingScreen />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isSessionChecked: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  checkSession: PropTypes.func.isRequired,
  jwt: PropTypes.string.isRequired,
};

export default PrivateRoute;
