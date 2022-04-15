import Base from './Base.js';

export default class UsersAPI extends Base {
    get(params) {
        return this.apiClient.get('users', params);
    }

    create(user) {
        return this.apiClient.post('users', user);
    }

    edit(user, id) {
        return this.apiClient.patch(`users/${id}`, user);
    }
}
