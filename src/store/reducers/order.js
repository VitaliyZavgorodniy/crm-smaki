import produce from "immer";

import moment from 'moment';

import {
  UPDATE_ORDER,
  UPDATE_ORDER_DATA,
  UPDATE_ORDER_CLIENT,
  UPDATE_ORDER_ADDRESS,
  UPDATE_ORDER_ITEMS,
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  INCREASE_ORDER_ITEM_QUANTITY,
  DECREASE_ORDER_ITEM_QUANTITY,
  UPDATE_ORDER_ITEM_COMMENT,
  UPDATE_ORDER_PAYMENTS,
  ADD_ORDER_PAYMENTS,
  REMOVE_ORDER_PAYMENTS,
  RESET_ORDER,
} from "../constants/order";

const initialState = {
  data: {
    id: null,
    status: "draft",
    restaurant: "smaki",
    kitchen_code: "",
    payment_type: "",
    change_from: "",
    type: "soon",
    return_call: "",
    client_comment: "",
    delivered_till: null,
    client: {
      id: null,
      name: "",
      phone: "380",
      source: "website",
    },
    address: {
      city_sync_id: "lviv",
      street: "",
      house_number: "",
      entrance: "",
      apartment: "",
      floor: "",
      comment: "",
      comment_to_administrator: "",
      comment_to_courier: "",
      latitude: "",
      longitude: "",
    },
    items: [],
    payments: [],
  },
};

export default produce((draft, action) => {
  const { type, payload = {} } = action;
  const { item, data = "" } = payload;

  switch (type) {
    case UPDATE_ORDER_DATA: {
      draft.data[item] = data;
      break;
    }

    case UPDATE_ORDER_CLIENT: {
      if (!item) {
        draft.data.client.id = data.id;
        draft.data.client.name = data.name;
        draft.data.client.phone = data.phone;
      } else draft.data.client[item] = data;
      break;
    }

    case UPDATE_ORDER_ADDRESS: {
      draft.data.address[item] = data;
      break;
    }

    // Items

    case UPDATE_ORDER_ITEMS: {
      draft.data.items = data;
      break;
    }

    case ADD_ORDER_ITEM: {
      const index = draft.data.items.findIndex((el) => el.id === data.id);
      if (index === -1)
        draft.data.items.push({ ...data, quantity: 1, comment: "" });
      break;
    }

    case REMOVE_ORDER_ITEM: {
      const index = draft.data.items.findIndex((el) => el.id === data.id);
      if (index !== -1) draft.data.items.splice(index, 1);
      break;
    }

    case INCREASE_ORDER_ITEM_QUANTITY: {
      const index = draft.data.items.findIndex((el) => el.id === data);
      if (index !== -1) draft.data.items[index].quantity += 1;
      break;
    }

    case DECREASE_ORDER_ITEM_QUANTITY: {
      const index = draft.data.items.findIndex((el) => el.id === data);
      if (index !== -1)
        if (draft.data.items[index].quantity === 1)
          draft.data.items.splice(index, 1);
        else draft.data.items[index].quantity -= 1;
      break;
    }
    case UPDATE_ORDER_ITEM_COMMENT: {
      const index = draft.data.items.findIndex((el) => el.id === item);
      if (index !== -1) draft.data.items[index].comment = payload.data;
      break;
    }

    // Payments

    case UPDATE_ORDER_PAYMENTS: {
      for (const value of draft.data.payments)
        if (value.payment_type === item) value.sum = data;

      break;
    }

    case ADD_ORDER_PAYMENTS: {
      let isNew = true;

      for (const value of draft.data.payments) {
        if (value.payment_type === item) isNew = false;
      }

      if (isNew) draft.data.payments.push({ payment_type: item, sum: data });

      break;
    }

    case REMOVE_ORDER_PAYMENTS: {
      const index = draft.data.payments.findIndex(
        (value) => value.payment_type === item
      );

      if (index !== -1) draft.data.payments.splice(index, 1);

      break;
    }

    case UPDATE_ORDER: {
      if (!!payload.id) {
        const { client, address, items, payments } = payload;

        const mappedItems = items.map((item) => {
          return {
            id: item.id,
            article: item.product.article,
            title: item.product.title_ua,
            description: item.product.description_ua,
            price: item.price,
            quantity: item.quantity,
            comment: item.comment ? item.comment : "",
            restaurant: item.product.restaurant,
          };
        });

        const mappedPayments = payments.map((item) => {
          return {
            payment_type: item.payment_type,
            sum: item.sum,
          };
        });

        draft.data = {
          id: payload.id,
          status: payload.status,
          delivered_till: payload.delivered_till,
          restaurant: payload.restaurant,
          kitchen_code: payload.kitchen_code,
          payment_type: payload.payment_type,
          change_from: payload.change_from,
          type: payload.type,
          return_call: payload.return_call,
          client_comment: payload.client_comment,
          client: {
            id: client.id,
            name: client.name,
            phone: client.phone,
          },
          address: {
            city_sync_id: address.city_sync_id,
            street: address.street,
            house_number: address.house_number,
            entrance: address.entrance,
            apartment: address.apartment,
            floor: address.floor,
            comment: address.comment,
            latitude: address.latitude,
            longitude: address.longitude,
            comment_to_administrator: address.comment_to_administrator,
            comment_to_courier: address.comment_to_courier,
          },
          items: mappedItems,
          payments: mappedPayments,
          history: payload.history,
        };
      } else draft.data = initialState.data;
      break;
    }

    case RESET_ORDER: {
      draft.data = initialState.data;
      break;
    }

    default: {
      break;
    }
  }
}, initialState);
