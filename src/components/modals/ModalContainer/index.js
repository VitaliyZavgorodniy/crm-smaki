import { connect } from 'react-redux';

import { default as ModalContainer } from './ModalContainer';

function mapStateToProps(state) {
    return {
        modals : state.view.modals
    };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
