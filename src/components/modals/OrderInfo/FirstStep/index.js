import { connect } from 'react-redux';

import * as clientsActions from '../../../../store/actions/clients';
import * as ordersActions from '../../../../store/actions/orders';
import * as productsActions from '../../../../store/actions/products';
import { default as FirstStep } from './FirstStep';

function mapStateToProps(state) {
    const sources = state.clients.sources.map(el => ({ value: el.name, label: el.title }));
    const cities = state.settings.cities.map(el => ({ value: el.sync_id, label: el.name }));
    const kitchens = state.settings.kitchens.map(el => ({ value: el.code, label: el.title }));
    const paymentTypes = state.orders.paymentTypes.map(el => ({ value: el.name, label: el.title }));
    const statuses = state.orders.statuses.map(el => ({ value: el.name, label: el.title }));
    const clients =
        state.clients.list.map(el => ({ value: el.id, label: el.phone, name: el.name }));

    return {
        sources,
        cities,
        kitchens,
        paymentTypes,
        statuses,
        clients,
        modals      : state.view.modals,
        activeOrder : state.orders.activeOrder,
        orderStatus : state.orders.orderStatus
    };
}

const mapDispatchToProps = {
    ...ordersActions,
    ...productsActions,
    ...clientsActions
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);
