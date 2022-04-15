import { connect } from "react-redux";

import * as viewActions from "../../store/actions/statistic";
import { default as StatisticPage } from "./StatisticPage";

function mapStateToProps(state) {
  return {
    statistic: state.statistic.statistic,
    kitchens: state.statistic.kitchens,
  };
}

const mapDispatchToProps = {
  ...viewActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticPage);
