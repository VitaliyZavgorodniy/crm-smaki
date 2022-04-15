import { connect } from "react-redux";

import { default as Courier } from "./Courier";

function mapStateToProps(state) {
  const { user } = state;
  const { orders } = state.listings;

  return {
    user,
    orders,
  };
}

const mapDispatchToProps = {
  // ...ordersAction,
  // ...orderActions,
  // ...modalsActions,
  // ...listingsActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Courier);
