import * as ROUTES from "./routes";

const navTabsByRole = {
  system_administrator: [
    {
      title: "Call-центр",
      path: ROUTES.CALLCENTER,
      icon: "home",
    },
    {
      title: "Кухня",
      path: ROUTES.KITCHEN,
      icon: "home",
    },
    {
      title: "Повар",
      path: ROUTES.COOK,
      icon: "home",
    },

    // {
    //   title: "Кур'єр",
    //   path: ROUTES.COURIER,
    //   icon: "home",
    // },
    {
      title: "Закрытые заказы",
      path: ROUTES.CLOSED_ORDERS,
      isHidden: true,
    },
    {
      title: "Статистика",
      path: ROUTES.STATISTICS,
      icon: "home",
    },
    {
      title: "Статистика Поездки",
      path: ROUTES.STATISTICSDETAIL,
      isHidden: true,
    },
    {
      title: "Користувачі",
      path: ROUTES.USERS,
      icon: "home",
    },
    {
      title: "Товари",
      path: ROUTES.PRODUCTS,
      icon: "home",
    },
    {
      title: "Редактирование товара",
      path: ROUTES.PRODUCT,
      icon: "home",
      isHidden: true,
    },
  ],
  administrator: [
    {
      title: "Статистика",
      path: ROUTES.STATISTICS,
      icon: "home",
    },
    {
      title: "Кухня",
      path: ROUTES.KITCHEN,
      icon: "home",
    },
    // {
    //   title: "Заказы",
    //   path: ROUTES.ORDERS,
    //   icon: "home",
    // },
    // {
    //   title: "Закрытые заказы",
    //   path: ROUTES.CLOSED_ORDERS,
    //   isHidden: true,
    // },

    // {
    //   title: "Пользователи",
    //   path: ROUTES.USERS,
    //   icon: "home",
    // },
    // {
    //   title: "Товары",
    //   path: ROUTES.PRODUCTS,
    //   icon: "home",
    // },
    // {
    //   title: "Редактирование товара",
    //   path: ROUTES.PRODUCT,
    //   icon: "home",
    //   isHidden: true,
    // },
  ],
  external_service: [
    {
      title: "Заказы",
      path: ROUTES.ORDERS,
      icon: "home",
    },
    {
      title: "Закрытые заказы",
      path: ROUTES.CLOSED_ORDERS,
      isHidden: true,
    },
    {
      title: "Статистика",
      path: ROUTES.STATISTICS,
      icon: "home",
    },
    {
      title: "Пользователи",
      path: ROUTES.USERS,
      icon: "home",
    },
    {
      title: "Товары",
      path: ROUTES.PRODUCTS,
      icon: "home",
    },
    {
      title: "Редактирование товара",
      path: ROUTES.PRODUCT,
      icon: "home",
      isHidden: true,
    },
  ],
  manager: [
    {
      title: "Статистика",
      path: ROUTES.STATISTICS,
      icon: "home",
    },
    // {
    //   title: "Заказы",
    //   path: ROUTES.ORDERS,
    //   icon: "home",
    // },
    // {
    //   title: "Закрытые заказы",
    //   path: ROUTES.CLOSED_ORDERS,
    //   isHidden: true,
    // },

    // {
    //   title: "Пользователи",
    //   path: ROUTES.USERS,
    //   icon: "home",
    // },
    // {
    //   title: "Товары",
    //   path: ROUTES.PRODUCTS,
    //   icon: "home",
    // },
    // {
    //   title: "Редактирование товара",
    //   path: ROUTES.PRODUCT,
    //   icon: "home",
    //   isHidden: true,
    // },
  ],
  call_center_operator: [
    {
      title: "Заказы",
      path: ROUTES.CALLCENTER,
      icon: "home",
    },
    {
      title: "Закрытые заказы",
      path: ROUTES.CLOSED_ORDERS,
      isHidden: true,
    },
  ],
  content_manager: [
    {
      title: "Пользователи",
      path: ROUTES.USERS,
      icon: "home",
    },
    {
      title: "Товары",
      path: ROUTES.PRODUCTS,
      icon: "home",
    },
    {
      title: "Редактирование товара",
      path: ROUTES.PRODUCT,
      icon: "home",
      isHidden: true,
    },
  ],
  cook: [
    {
      title: "Заказы",
      path: ROUTES.COOK,
      icon: "home",
    },
    {
      title: "Кухня",
      path: ROUTES.KITCHEN,
      icon: "home",
    },
  ],
  courier: [
    {
      title: "Курьер",
      path: ROUTES.COURIER,
      icon: "home",
    },
    {
      title: "Статистика",
      path: ROUTES.STATISTICS,
      icon: "home",
    },
  ],
  analyst: [
    // {
    //   title: "Заказы",
    //   path: ROUTES.ORDERS,
    //   icon: "home",
    // },
    {
      title: "Закрытые заказы",
      path: ROUTES.CLOSED_ORDERS,
      isHidden: true,
    },
    {
      title: "Статистика",
      path: ROUTES.STATISTICS,
      icon: "home",
    },
  ],
};

export default navTabsByRole;
