import { connect } from "react-redux";

import * as modalsActions from "store/actions/modals";
import * as orderActions from "store/actions/order";

import { default as ModalEditor } from "./ModalEditor";

function mapStateToProps(state) {
  return {
    order: state.order.data,
    isOpen: state.modals.callCenter.isOpen,
    data: state.modals.callCenter.data,
    activeOrder: state.orders.activeOrder,
    orderStatus: state.orders.orderStatus,
    fullUsers: state.users.fullUsers,
  };
}

const mapDispatchToProps = {
  ...modalsActions,
  ...orderActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditor);
