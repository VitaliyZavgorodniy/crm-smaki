import { connect } from 'react-redux';

import * as ordersActions from '../../../store/actions/orders';
import * as productsActions from '../../../store/actions/products';
import { productsWithSearchSelector } from '../../../selectors/products';
import { default as ProductsModal } from './Products';

function mapStateToProps(state) {
    const productCategories = state.settings.productCategories.map(el => ({
        key   : el.sync_id,
        title : el.name
    }));

    return {
        products          : productsWithSearchSelector(state),
        isFetching        : state.products.isFetching,
        productCategories : [ { key: 'all', title: 'Все' }, ...productCategories ],
        activeOrder       : state.orders.activeOrder
    };
}

const mapDispatchToProps = {
    ...ordersActions,
    ...productsActions
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsModal);
