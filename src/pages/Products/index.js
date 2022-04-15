import { connect } from 'react-redux';

import * as productsActions from '../../store/actions/products';
import { productsWithSearchSelector } from '../../selectors/products';
import { default as ProductsPage } from './ProductsPage';

function mapStateToProps(state) {
    const productCategories = state.settings.productCategories.map(el => ({
        key   : el.sync_id,
        title : el.name
    }));

    return {
        products          : productsWithSearchSelector(state),
        isFetching        : state.products.isFetching,
        productCategories : [ { key: 'all', title: 'Все' }, ...productCategories ]
    };
}

const mapDispatchToProps = {
    ...productsActions
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
