import { connect } from "react-redux";

import * as modalsActions from "store/actions/modals";
import * as orderActions from "store/actions/order";

import { default as OrdersList } from "./OrdersList";

function mapStateToProps(state) {

  return {
    isOpen: state.modals.callCenter.isOpen,
    activeOrder: state.orders.activeOrder,
    orderStatus: state.orders.orderStatus,
    fullUsers: state.users.fullUsers,
    cities: state.settings.cities,
    kitchens: state.settings.kitchens
  };
}

const mapDispatchToProps = {
  ...modalsActions,
  ...orderActions
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
