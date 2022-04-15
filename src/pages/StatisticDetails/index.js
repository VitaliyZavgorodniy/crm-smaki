import { connect } from "react-redux";

import * as viewActions from "../../store/actions/statistic";
import { default as StatisticDetailsPage } from "./StatisticDetailsPage";

function mapStateToProps(state) {
  return {
    user: state.user.user.data,
    statistic: state.statistic.statistic,
    deliveries: state.statistic.deliveries,
  };
}

const mapDispatchToProps = {
  ...viewActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticDetailsPage);
