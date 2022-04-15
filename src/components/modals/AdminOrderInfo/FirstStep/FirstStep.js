/*  no-magic-numbers */
/*  camelcase */

import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Input from '../../../ui-kit/Input';
import Select from '../../../ui-kit/Select';
import styles from './FirstStep.module.scss';

function FirstStep({
    sources,
    cities,
    kitchens,
    activeOrder,
    setActiveOrder,
    paymentTypes,
    getProducts,
    errors,
    onInputChange,
    clients,
    getClients,
    statuses,
    orderStatus
}) {
    const {
        payment_type,
        change_from,
        restaurant,
        kitchen_code,
        client_comment,
        status,
        client: {
            name,
            phone,
            source
        },
        address:{
            city_sync_id,
            street,
            house_number,
            entrance,
            floor
        }
    } = activeOrder;

    const [ phoneValue, setPhoneValue ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (orderStatus === 'edit') {
            getProducts({
                restaurant : restaurant.value,
                per_page   : 500
            });
        }
    }, []);

    const handlePhoneChange = async ({ value }) => {
        const param = !!value ? value : undefined;

        setPhoneValue(value);

        if (value.length % 3 === 0) {
            setIsLoading(true);
            await getClients(param);
            setIsLoading(false);
        }
    };

    const updateOrder = ({ valueKey, value }) => {
        const newOrder = cloneDeep(activeOrder);

        switch (valueKey) {
            case 'return_call': {
                newOrder[valueKey] = +value.value;
                break;
            }

            case 'payment_type':
            case 'status':
            case 'kitchen_code':
            case 'client_comment':
            case 'change_from': {
                newOrder[valueKey] = value;
                break;
            }

            case 'city_sync_id':
            case 'house_number':
            case 'entrance':
            case 'floor':
            case 'street': {
                onInputChange({ valueKey, objectKey: 'address' });
                newOrder.address[valueKey] = value;
                break;
            }

            case 'name':
            case 'source': {
                onInputChange({ valueKey, objectKey: 'client' });
                newOrder.client[valueKey] = value;
                break;
            }

            case 'phone': {
                const { value: newValue, label, name: newName } = value;
                const isNeedtoRemoveAfterBracket = valueKey === 'phone' && label.length === 9;
                const isNeedToAddBracket = valueKey === 'phone'
                    && label.length === 8
                    && label.length > activeOrder.client.phone.value.length;

                if (isNeedToAddBracket) {
                    newOrder.client[valueKey].label = `${label}) `;
                } else if (isNeedtoRemoveAfterBracket) {
                    newOrder.client[valueKey].label = label.slice(0, -2);
                } else {
                    newOrder.client[valueKey].label = label;
                }

                newOrder.client[valueKey].value = newValue;
                newOrder.client.id = newValue;

                if (!!newValue) {
                    newOrder.client.name = newName;
                    onInputChange({ valueKey: 'name', objectKey: 'client' });
                }

                onInputChange({ valueKey, objectKey: 'client' });

                break;
            }

            default:
                break;
        }

        setActiveOrder(newOrder);
    };

    const renderInput = props => {
        return (
            <Input
                className={styles.input}
                mode='secondary'
                onChange={updateOrder}
                {...props}
            />
        );
    };

    const renderClient = () => {
        const { client: { is_regular } } = activeOrder;

        return (
            <div className={styles.client}>
                <p>Клиент</p>

                <div className={styles.clientStatuses}>
                    <span
                        className={styles.status}
                        {...(is_regular && { style: { color: '#EDA240' } })}
                    >Постоянный
                    </span>

                    <span
                        className={styles.status}
                        {...(!is_regular && { style: { color: '#EDA240' } })}
                    >Новый
                    </span>
                </div>

                <div className={styles.nameContainer}>
                    <p>{name}</p>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {renderClient()}

            <Select
                selectOptions={paymentTypes}
                selectedOption={payment_type}
                valueKey='payment_type'
                label='Оплата'
                onChange={updateOrder}
            />

            {payment_type.value === 'cash' && renderInput({
                value       : `${change_from}`,
                valueKey    : 'change_from',
                label       : 'Сдача с',
                placeholder : 'Сумма'
            })}

            <Select
                selectOptions={statuses}
                selectedOption={status}
                valueKey='status'
                label='Статус заказа'
                onChange={updateOrder}
            />

            {renderInput({
                value       : name,
                valueKey    : 'name',
                label       : 'Имя',
                placeholder : 'ФИО',
                error       : errors?.client?.name
            })}

            <Select
                selectOptions={clients}
                selectedOption={phone}
                valueKey='phone'
                label='Телефон'
                error={errors?.client?.phone}
                onChange={updateOrder}
                onInputChange={handlePhoneChange}
                inputValue={phoneValue}
                isLoading={isLoading}
                isSearchable
            />

            <Select
                selectOptions={cities}
                selectedOption={city_sync_id}
                valueKey='city_sync_id'
                label='Город'
                onChange={updateOrder}
            />

            {renderInput({
                value       : street,
                valueKey    : 'street',
                label       : 'Улица',
                placeholder : 'Название',
                error       : errors?.address?.street
            })}

            <div className={styles.inputsGroup}>
                {renderInput({
                    value       : house_number,
                    valueKey    : 'house_number',
                    label       : 'Дом',
                    placeholder : '2',
                    error       : errors?.address?.house_number
                })}

                {renderInput({
                    value       : entrance,
                    valueKey    : 'entrance',
                    label       : 'Подъезд',
                    placeholder : '1',
                    error       : errors?.address?.entrance
                })}

                {renderInput({
                    value       : floor,
                    valueKey    : 'floor',
                    label       : 'Этаж',
                    placeholder : '4',
                    error       : errors?.address?.floor
                })}
            </div>

            <Select
                selectOptions={kitchens}
                selectedOption={kitchen_code}
                valueKey='kitchen_code'
                label='Кухня'
                onChange={updateOrder}
            />

            <Select
                selectOptions={sources}
                selectedOption={source}
                valueKey='source'
                label='Источник'
                onChange={updateOrder}
            />

            {renderInput({
                value       : client_comment,
                valueKey    : 'client_comment',
                label       : 'Комментарий',
                placeholder : 'Комментарий'
            })}
        </div>
    );
}

FirstStep.propTypes = {
    sources        : PropTypes.array.isRequired,
    cities         : PropTypes.array.isRequired,
    kitchens       : PropTypes.array.isRequired,
    activeOrder    : PropTypes.object.isRequired,
    setActiveOrder : PropTypes.func.isRequired,
    paymentTypes   : PropTypes.array.isRequired,
    statuses       : PropTypes.array.isRequired,
    clients        : PropTypes.array.isRequired,
    getProducts    : PropTypes.func.isRequired,
    getClients     : PropTypes.func.isRequired,
    errors         : PropTypes.object.isRequired,
    onInputChange  : PropTypes.func.isRequired,
    orderStatus    : PropTypes.string.isRequired
};

export default React.memo(FirstStep);
