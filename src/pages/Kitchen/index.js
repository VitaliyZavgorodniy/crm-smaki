/*  camelcase */
import { connect } from "react-redux";

import * as modalsActions from "store/actions/modals";
import * as ordersAction from "store/actions/orderslist";
import * as orderActions from "store/actions/order";
import * as listingsActions from "store/actions/listings";

import { default as KitchenPage } from "./KitchenPage";

function mapStateToProps(state) {
  const { user } = state;
  const { orders } = state.listings;

  return {
    user,
    orders,
  };
}

const mapDispatchToProps = {
  ...ordersAction,
  ...orderActions,
  ...modalsActions,
  ...listingsActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(KitchenPage);