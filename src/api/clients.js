import Base from './Base.js';

export default class ClientsAPI extends Base {
    getClients(payload) {
        return this.apiClient.get('clients', payload);
    }

    getSources() {
        return this.apiClient.get('sources');
    }
}
