import { connect } from 'react-redux';

import * as ordersActions from '../../../../store/actions/orders';
import * as viewActions from '../../../../store/actions/view';
import { default as SecondStep } from './SecondStep';

function mapStateToProps(state) {
    const { fullUsers } = state.users;
    const timeTypes = state.orders.timeTypes.map(el => ({ value: el.name, label: el.title }));

    let operators = [];

    let couriers = [];

    let cooks = [];

    if (fullUsers) {
        operators = fullUsers
            .filter(el => el.role_name === 'call_center_operator')
            .map(el => ({ value: el.id, label: `${el.first_name} ${el.last_name}` }));

        couriers = fullUsers
            .filter(el => el.role_name === 'courier')
            .map(el => {
                return {
                    value : el.id, label : `${el.first_name} ${el.last_name}`
                };
            });

        cooks = fullUsers
            .filter(el => el.role_name === 'cook')
            .map(el => {
                return {
                    value : el.id, label : `${el.first_name} ${el.last_name}`
                };
            });
    }

    return {
        modals      : state.view.modals,
        activeOrder : state.orders.activeOrder,
        timeTypes,
        operators,
        couriers,
        cooks
    };
}

const mapDispatchToProps = {
    ...ordersActions,
    ...viewActions
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);
