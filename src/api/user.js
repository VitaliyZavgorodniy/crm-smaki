import Base from './Base.js';

export default class UserAPI extends Base {
    get() {
        return this.apiClient.get('me');
    }
}