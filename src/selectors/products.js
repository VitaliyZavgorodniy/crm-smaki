import sortBy             from 'lodash/sortBy';
import { createSelector } from 'reselect';

export const allProductsSelector = state => state.products.list;

export const productsSearchQuerySelector = state => state.products.searchQuery;

export const productsWithSearchSelector = createSelector(
    allProductsSelector,
    productsSearchQuerySelector,
    (allProducts, seachQuery) => {
        const products = allProducts;
        const filtered = filterByName(products, seachQuery);

        return sortBy(filtered, n => -n.createdAt);
    }
);

function filterByName(products, searchQuery) {
    return products.filter(product => {
        const article  = product.article.toLowerCase();
        const titleRu  = product.title_ru.toLowerCase();
        const titleUa  = product.title_ua.toLowerCase();
        const descRu  = product.description_ru.toLowerCase();
        const descUa  = product.description_ua.toLowerCase();
        const query = searchQuery.toLowerCase();

        return article.includes(query)
            || titleRu.includes(query)
            || titleUa.includes(query)
            || descRu.includes(query)
            || descUa.includes(query);
    });
}
