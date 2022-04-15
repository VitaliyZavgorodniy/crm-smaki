import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const timeout = null;

function PublicRoute(props) {
  const { children, withSessionCheck, isUserLoggedIn, checkSession } =
    props || {};

  const [isSessionChecked, setIsSessionChecked] = useState(
    isUserLoggedIn || props?.isSessionChecked
  );

  useEffect(() => {
    if (withSessionCheck && !isSessionChecked) {
      checkCurrentSession();
    }

    return () => timeout && clearTimeout(timeout);
  }, []);

  function checkCurrentSession() {
    try {
      checkSession();
    } catch (error) {
      console.error({ error });
    } finally {
      setIsSessionChecked(true);
    }
  }

  if (withSessionCheck && !isSessionChecked) {
    return null;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  withSessionCheck: PropTypes.bool,
  checkSession: PropTypes.func.isRequired,
};

PublicRoute.defaultProps = {
  withSessionCheck: false,
};

export default PublicRoute;
