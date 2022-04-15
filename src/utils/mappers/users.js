/*  camelcase */
const STATUSES = {
    active   : 'Активен',
    disabled : 'Неактивен'
};

export function mapUsers(users, cities, kitchens) {
    const list =
        users.map((user, index) => mapUser(user, index, cities, kitchens)).filter(el => el);

    return { list };
}

const mapUser = (user, id, cities, kitchens) => {
    const output = { id };
    const { city_sync_id } = user;
    const kitchen_code = user.locations[0]?.kitchen_code;
    const { name } = cities.find(el => el.city_sync_id === city_sync_id);
    const kitchen = kitchens.find(el => el.code === kitchen_code);

    output.first_name = user.first_name?.trim() || 'Не указано';
    output.last_name = user.last_name?.trim() || 'Не указано';
    output.phone = user?.phone || 'Не указано';
    output.position = user?.position || user?.role_title || 'Не указано';
    output.kitchen = kitchen?.title || 'Не указано';
    output.city = name || 'Не указано';
    output.status = STATUSES[user?.status] || 'Не указано';
    output.id = user.id;

    if (user.productTypes) {
        output.productTypes = user.productTypes;
    }

    if (user.iiko) {
        output.iiko_id = user.iiko.iiko_id;
    }

    return output;
};

