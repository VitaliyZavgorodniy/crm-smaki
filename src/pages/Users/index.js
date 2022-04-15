import { connect } from 'react-redux';

import * as usersActions from '../../store/actions/users';
import * as viewActions from '../../store/actions/view';
import { default as UsersPage } from './UsersPage';

function mapStateToProps(state) {
    const productTypes =
        state.settings.productTypes.map(el => ({ value: el.sync_id, label: el.name }));

    return {
        productTypes
    };
}

const mapDispatchToProps = {
    ...usersActions,
    ...viewActions
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
