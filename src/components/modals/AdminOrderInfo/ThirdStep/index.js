import { connect } from 'react-redux';

import * as viewActions from '../../../../store/actions/view';
import { default as ThirdStep } from './ThirdStep';

function mapStateToProps(state) {
    return {
        modals      : state.view.modals,
        activeOrder : state.orders.activeOrder
    };
}

const mapDispatchToProps = {
    ...viewActions
};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep);
