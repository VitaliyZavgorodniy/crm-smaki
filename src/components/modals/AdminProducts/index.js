import { connect } from 'react-redux';

import * as ordersActions from '../../../store/actions/orders';
import { default as AdminProducts } from './AdminProducts';

function mapStateToProps(state) {
    return {
        activeOrder : state.orders.activeOrder,
        products    : state.products.list
    };
}

const mapDispatchToProps = {
    ...ordersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
