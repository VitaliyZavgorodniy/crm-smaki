/*  no-unused-vars */
/*  camelcase */

import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import React from 'react';

import Base from '../Base';
import styles from './AdminProducts.module.scss';
import Product from './Product';

function AdminProducts({ activeOrder, products, setActiveOrder }) {
    const handleInputChange = (value, id) => {
        const index = activeOrder.items.findIndex(el => el.product_id === id);
        const newActiveOrder = cloneDeep(activeOrder);

        newActiveOrder.items[index].comment = value;

        setActiveOrder(newActiveOrder);
    };

    const getPrice = product => {
        const city = activeOrder.address.city_sync_id.value;
        const price = product.prices?.find(el => el.city_sync_id === city)?.price || 0;

        return price;
    };

    const renderProducts = () => {
        const { items } = activeOrder;

        return (
            <>
                <div className={styles.productsHeader}>
                    <p className={styles.productsHeaderTitle}>
                        Позиции
                    </p>

                    <p className={styles.productsHeaderTitle}>
                        Кол-во
                    </p>
                </div>

                <div className={styles.products}>
                    {items.map(el => {
                        const product = {
                            ...products.find(p => p.id === el.product_id),
                            quantity : el.quantity,
                            comment  : el.comment,
                            address  : el.address,
                            status   : el.status
                        };

                        const price = getPrice(product);
                        const {
                            id,
                            image,
                            title_ru,
                            title_ua,
                            quantity,
                            comment,
                            status
                        } = product;

                        return (
                            <Product
                                key={id}
                                image={image || ''}
                                title={title_ru || title_ua}
                                price={price}
                                quantity={quantity}
                                comment={comment || ''}
                                status={status}
                                onInputChange={({ value }) => handleInputChange(value, id)}
                            />
                        );
                    })}
                </div>
            </>
        );
    };

    return (
        <div className={styles.productsModal}>
            <Base
                configuration={{
                    fields : [
                        {
                            type              : 'customField',
                            renderCustomField : renderProducts
                        }
                    ]
                }}
            />
        </div>
    );
}

AdminProducts.propTypes = {
    activeOrder    : PropTypes.object.isRequired,
    setActiveOrder : PropTypes.func.isRequired,
    products       : PropTypes.array.isRequired
};

export default React.memo(AdminProducts);
