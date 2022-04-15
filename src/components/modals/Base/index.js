import { connect } from 'react-redux';

import * as ordersActions from '../../../store/actions/orders';
import * as viewActions from '../../../store/actions/view';
import { default as Base } from './Base';

function mapStateToProps() {
    return {};
}

const mapDispatchToProps = {
    ...viewActions,
    ...ordersActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Base);
