import { connect } from "react-redux";

import * as sessionActions from "../../../store/actions/session";
import {
  isSessionCheckedSelector,
  isUserLoggedInSelector,
} from "../../../selectors/session";
import PrivateRoute from "./PrivateRoute";

function mapStateToProps(state) {
  return {
    isUserLoggedIn: isUserLoggedInSelector(state),
    isSessionChecked: isSessionCheckedSelector(state),
    jwt: state.session.jwt,
  };
}

const mapDispatchToProps = {
  ...sessionActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
