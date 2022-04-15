import { connect } from 'react-redux';

import * as sessionActions from '../../../store/actions/session';
import { isUserLoggedInSelector } from '../../../selectors/session';
import PublicRoute from './PublicRoute';

function mapStateToProps(state) {
    return {
        isUserLoggedIn : isUserLoggedInSelector(state)
    };
}

const mapDispatchToProps = {
    ...sessionActions
};


export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
