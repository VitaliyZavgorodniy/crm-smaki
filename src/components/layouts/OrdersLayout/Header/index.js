import { connect } from 'react-redux';

import * as ordersActions from '../../../../store/actions/orders';
import * as productsActions from '../../../../store/actions/products';
import * as viewActions from '../../../../store/actions/view';
import { userSelector } from '../../../../selectors/user';
import { default as Header } from './Header';

function mapStateToProps(state) {
    return {
        modals              : state.view.modals,
        productsSearchQuery : state.products.searchQuery,
        ordersSearchQuery   : state.orders.searchQuery,
        user                : userSelector(state)
    };
}

const mapDispatchToProps = {
    ...viewActions,
    ...productsActions,
    ...ordersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
