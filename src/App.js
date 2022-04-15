import React, { Component } from "react";
import { Switch } from "react-router";
import { Router } from "react-router-dom";

import "assets/styles/index.scss";

import * as ROUTES from "constants/routes";
import history from "constants/history";
import AppRoute from "routes/AppRoute";

import CommonLayout from "components/layouts/CommonLayout";
import ShortLayout from "components/layouts/ShortLayout";

import Login from "pages/Login";
import CallcenterPage from "pages/Callcenter";
import KitchenPage from "pages/Kitchen";
import CookPage from "pages/Cook";
import Courier from "pages/Courier";
import StatisticPage from "pages/Statistic";
import StatisticDetailsPage from "pages/StatisticDetails";
import UsersPage from "pages/Users";
import ProductPage from "pages/Product";
import ProductsPage from "pages/Products";

// for removing
import OrdersPage from "pages/Orders";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <AppRoute
            path={ROUTES.LOGIN}
            component={Login}
            exact
            isPublic
            checkSession
          />
          <AppRoute
            path={ROUTES.ROOT}
            component={CallcenterPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.CALLCENTER}
            component={CallcenterPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.ORDERS}
            component={OrdersPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.CLOSED_ORDERS}
            component={OrdersPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.STATISTICS}
            component={StatisticPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.STATISTICSDETAIL}
            component={StatisticDetailsPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.USERS}
            component={UsersPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.PRODUCTS}
            component={ProductsPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.PRODUCT}
            component={ProductPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.KITCHEN}
            component={KitchenPage}
            layout={CommonLayout}
            exact
          />
          <AppRoute
            path={ROUTES.COOK}
            component={CookPage}
            layout={ShortLayout}
            exact
          />
          <AppRoute
            path={ROUTES.COURIER}
            component={Courier}
            layout={ShortLayout}
            exact
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
