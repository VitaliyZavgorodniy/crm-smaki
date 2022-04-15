import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function withRedicrect(Component) {
  return function ConnectedComponent(props) {
    const { isRedirect, urlToRedirect, ...restProps } = props;
    const history = useHistory();

    useEffect(() => {
      if (isRedirect) {
        // console.log("redirecting");
        history.replace(urlToRedirect);
      }
    }, []);

    return <Component {...restProps} />;
  };
}
