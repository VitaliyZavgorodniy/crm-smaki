import moment from "moment";

export const mappedDistances = (arr) =>
  arr.map((item) => {
    const distance =
      ((item.sum_delivery_distance + item.sum_return_distance) * 1.2) / 1000;

    return {
      id: item.user_id,
      name: `${item.first_name} ${item.last_name}`,
      orders_within_city: item.orders_within_city,
      orders_outside_city: item.orders_outside_city,
      distance: distance.toFixed(2),
    };
  });

export const mappedDeliveries = (arr) =>
  arr.map((item) => {
    const distance =
      ((item.return_distance + item.delivery_distance) * 1.2) / 1000;

    return {
      id: item.id,
      delivered: moment(item.updated_at).format("Y-MM-DD HH:mm"),
      orders: item.orders.map((item) => {
        return { address: item.address, restaurant: item.restaurant };
      }),
      distance: distance.toFixed(2),
    };
  });
