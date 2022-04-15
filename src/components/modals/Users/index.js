import { connect } from "react-redux";

import * as usersActions from "../../../store/actions/users";
import * as viewActions from "../../../store/actions/view";
import { default as Users } from "./Users";

function mapStateToProps(state) {
  const productTypes = state.settings.productTypes.map((el) => ({
    value: el.sync_id,
    label: el.name,
  }));

  console.log(state.view.modals);

  return {
    isOpen: state.view?.modals.length > 0,
    modals: state.view.modals,
    editedUser: state.users.editedUser,
    cities: state.settings.cities,
    kitchens: state.settings.kitchens,
    roles: state.settings.roles,
    productTypes,
  };
}

const mapDispatchToProps = {
  ...viewActions,
  ...usersActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
