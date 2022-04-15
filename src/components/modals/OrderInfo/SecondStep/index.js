import { connect } from 'react-redux';

import * as ordersActions from '../../../../store/actions/orders';
import * as viewActions from '../../../../store/actions/view';
import { default as SecondStep } from './SecondStep';

function mapStateToProps(state) {
    return {
        modals      : state.view.modals,
        activeOrder : state.orders.activeOrder,
        products    : state.products.list
    };
}

const mapDispatchToProps = {
    ...ordersActions,
    ...viewActions
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);
