import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ModalContainer from "components/modals/ModalContainer";

import Table from "components/ui-kit/Table";
import { tableUsers } from "constants/tables";

import ButtonIcon from "components/ui-kit/ButtonIcon";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "components/ui-kit/Pagination";

function UsersPage({ getUsers, clearUsers, updateEditedUser, openModal }) {
  const [page, setPage] = useState(1);

  const users = useSelector((state) => state.users?.list);

  useEffect(() => {
    getUsers(page);
    return () => clearUsers();
  }, [page]);

  const handleEditUser = (user) => {
    updateEditedUser(user);
    openModal("user");
  };

  return (
    <>
      <Pagination onClick={setPage} />

      <Table onClick={handleEditUser} data={users} scheme={tableUsers} />

      <ButtonWrapper>
        <ButtonIcon
          onClick={() => openModal("user")}
          title='Новий користувач'
          icon={<AddIcon />}
        />
      </ButtonWrapper>

      <ModalContainer />
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 20px;
  right: 30px;
`;

export default React.memo(UsersPage);
