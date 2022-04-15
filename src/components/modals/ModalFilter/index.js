import { connect } from "react-redux";

import * as modalsActions from "store/actions/modals";
import * as listingsActions from "store/actions/listings";

import { default as ModalFilter } from "./ModalFilter";

function mapStateToProps(state) {
    return {
        isOpen: state.modals.fiilter.isOpen,
        kitchens: state.settings.kitchens,
        cities: state.settings.cities,
    };
}

const mapDispatchToProps = {
    ...modalsActions,
    ...listingsActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter);
