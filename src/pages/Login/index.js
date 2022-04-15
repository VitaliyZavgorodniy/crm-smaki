import { connect } from 'react-redux';
import { compose } from 'redux';

import * as sessionActions from '../../store/actions/session';
import { isUserLoggedInSelector } from '../../selectors/session';
import withRedicrect from '../withRedirect';
import { default as Login } from './Login';

function mapStateToProps(state) {
    return {
        isRedirect    : isUserLoggedInSelector(state),
        urlToRedirect : '/'
    };
}

const mapDispatchToProps = {
    ...sessionActions
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRedicrect
)(Login);
