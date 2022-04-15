import { connect } from 'react-redux';

import * as ordersActions from '../../../store/actions/orders';
import * as usersActions from '../../../store/actions/users';
import * as viewActions from '../../../store/actions/view';
import { default as OrderInfo } from './AdminOrderInfo';

function mapStateToProps(state) {
    return {
        modals      : state.view.modals,
        activeOrder : state.orders.activeOrder,
        orderStatus : state.orders.orderStatus,
        fullUsers   : state.users.fullUsers
    };
}

const mapDispatchToProps = {
    ...viewActions,
    ...ordersActions,
    ...usersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
