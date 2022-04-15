import { createSelector } from 'reselect';

export const allOrdersSelector = state => {
    const { list, items } = state.orders;

    return { list, items };
};

export const ordersSearchQuerySelector = state => state.orders.searchQuery;

export const ordersWithSearchSelector = createSelector(
    allOrdersSelector,
    ordersSearchQuerySelector,
    (allOrders, seachQuery) => {
        const { list, items } = allOrders;

        const filteredList = filterOrdersByName(list, seachQuery);
        const filteredItems = filterItemsByName(items, seachQuery);

        return { list: filteredList, items: filteredItems };
    }
);

function filterOrdersByName(orders, searchQuery) {
    return orders.filter(order => {
        const id  = `${order.id}`;
        const clientName  = order?.client?.name.toLowerCase();
        const clientPhone  = `${order?.client?.phone}`.toLowerCase();
        const street  = order?.address?.street.toLowerCase();
        const query = searchQuery.toLowerCase();

        return id.includes(query)
            || clientName.includes(query)
            || clientPhone.includes(query)
            || street.includes(query);
    });
}

function filterItemsByName(items, searchQuery) {
    return items.filter(item => {
        const id  = `${item.id}`;
        const article  = item.product.article.toLowerCase();
        const descRu  = item.product.description_ru.toLowerCase();
        const descUa  = item.product.description_ua.toLowerCase();
        const titleRu  = item.product.title_ru.toLowerCase();
        const titleUa  = item.product.title_ua.toLowerCase();
        const query = searchQuery.toLowerCase();

        return id.includes(query)
            || article.includes(query)
            || descRu.includes(query)
            || descUa.includes(query)
            || titleRu.includes(query)
            || titleUa.includes(query);
    });
}
