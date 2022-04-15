import { connect } from 'react-redux';
import { compose } from 'redux';

import * as productsActions from '../../store/actions/products';
import * as ROUTES from '../../constants/routes';
import history from 'constants/history';
import withRedicrect from '../withRedirect';
import { default as ProductPage } from './ProductPage';

function mapStateToProps(state) {
    const products = state.products.list;
    const productId = history.location.pathname.split('/')[2];
    const editedProduct = products.find(el => el.id === productId) || null;

    return {
        editedProduct,
        productTypes  : state.settings.productCategories,
        cities        : state.settings.cities,
        isRedirect    : !editedProduct,
        urlToRedirect : ROUTES.PRODUCTS
    };
}

const mapDispatchToProps = {
    ...productsActions
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRedicrect
)(ProductPage);
