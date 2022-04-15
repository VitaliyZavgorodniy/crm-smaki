import Base from './Base.js';

export default class ProductsAPI extends Base {
    getList(params) {
        return this.apiClient.get('products', params);
    }

    getProduct(id) {
        return this.apiClient.get(`products/${id}`);
    }

    updateProduct(product, id) {
        return this.apiClient.put(`products/${id}`, product);
    }

    updateProductImage(image, id) {
        return this.apiClient.post(`products/${id}/main-image`, image, 'formData');
    }
}
