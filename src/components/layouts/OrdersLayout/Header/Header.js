import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import * as ROUTES from "../../../../constants/routes";
import Button from "../../../ui-kit/Button";
import Input from "../../../ui-kit/Input";
import styles from "./Header.module.scss";
import Heading from "components/ui-kit/Heading";

function Header({
  title,
  date,
  openModal,
  updateProductsSearchQuery,
  productsSearchQuery,
  ordersSearchQuery,
  setActiveOrderStatus,
  user,
  updateOrdersSearchQuery,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocus, setIsSearchFocus] = useState("");
  const history = useHistory();

  const { pathname } = history?.location;
  const isOrdersPage = [
    ROUTES.ROOT,
    ROUTES.ORDERS,
    ROUTES.CLOSED_ORDERS,
  ].includes(pathname);
  const isUsersPage = pathname === ROUTES.USERS;
  const isProductsPage = pathname === ROUTES.PRODUCTS;

  const handleSearchChange = ({ value }) => {
    if (isProductsPage) {
      updateProductsSearchQuery(value);
    } else if (isOrdersPage) {
      updateOrdersSearchQuery(value);
    } else {
      setSearchQuery(value);
    }
  };

  const handleInputStateChange = () => setIsSearchFocus((prev) => !prev);

  const handleClearClick = () => {
    setSearchQuery("");
    updateProductsSearchQuery("");
  };

  const getSearchIcons = () => {
    if (searchQuery || productsSearchQuery) {
      return { iconleft: "searchLight", iconright: "close" };
    }

    return { iconleft: "search" };
  };

  const getHeaderClassName = () => {
    if (isSearchFocus || searchQuery) {
      return `${styles.header} ${styles.header_active}`;
    }

    return styles.header;
  };

  const getHeaderTitle = () => {
    if (pathname === ROUTES.CLOSED_ORDERS) {
      return "Открытые заказы";
    }

    return "Закрытые заказы";
  };

  const showOrHideClosedOrders = () => {
    if (pathname === ROUTES.CLOSED_ORDERS) {
      history.goBack();
    } else {
      history.push(ROUTES.CLOSED_ORDERS);
    }
  };

  const handleOpenModal = (modal) => openModal(modal);

  const handleStartCreatingOrder = () => {
    setActiveOrderStatus("create");
    handleOpenModal("orderInfo");
  };

  const renderHeaderActions = () => {
    return (
      <div className={styles.header__right}>
        {isOrdersPage && (
          <>
            {user?.role_name === "call_center_operator" ||
              user?.role_name === "administrator" ||
              (user?.role_name === "manager" && (
                <Button
                  mode='secondary'
                  className={styles.header__button}
                  label={getHeaderTitle()}
                  onClick={showOrHideClosedOrders}
                />
              ))}

            <Input
              isShowError={false}
              className={styles.header__input}
              value={ordersSearchQuery}
              placeholder='Search for food, coffe, etc..'
              onRightIconClick={handleClearClick}
              onChange={handleSearchChange}
              onFocus={handleInputStateChange}
              onBlur={handleInputStateChange}
              {...getSearchIcons()}
            />

            {user?.role_name === "call_center_operator" ||
              user?.role_name === "administrator" ||
              (user?.role_name === "manager" && (
                <Button
                  className={styles.header__button}
                  label='+ Создать'
                  onClick={handleStartCreatingOrder}
                />
              ))}
          </>
        )}

        {isUsersPage && (
          <Button
            className={styles.header__button}
            style={{ marginRight: 2 }}
            label='+ Создать'
            onClick={() => handleOpenModal("user")}
          />
        )}

        {isProductsPage && (
          <Input
            isShowError={false}
            className={styles.header__input}
            value={productsSearchQuery}
            placeholder='Search for food, coffe, etc..'
            onRightIconClick={handleClearClick}
            onChange={handleSearchChange}
            onFocus={handleInputStateChange}
            onBlur={handleInputStateChange}
            {...getSearchIcons()}
          />
        )}
      </div>
    );
  };

  return (
    <Wrapper>
      <Heading title={title} />

      {renderHeaderActions()}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 100px);
  height: 80px;
  margin-left: 100px;
  padding: 0 30px;
  /* pointer-events: all; */
`;

Header.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  updateProductsSearchQuery: PropTypes.func.isRequired,
  productsSearchQuery: PropTypes.string.isRequired,
  ordersSearchQuery: PropTypes.string.isRequired,
  setActiveOrderStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
  updateOrdersSearchQuery: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: "",
  user: {},
};

export default React.memo(Header);
