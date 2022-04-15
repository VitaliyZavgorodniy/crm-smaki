/*  no-magic-numbers */

/*  camelcase */
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../ui-kit/Button';
import Product from './Product';
import styles from './SecondStep.module.scss';

function SecondStep({ activeOrder, openModal, modals, setActiveOrder, products }) {
    const { items } = activeOrder;

    const handleShowProductsModal = () => {
        if (modals.length === 1) {
            openModal('products');
        }
    };

    const handleInputChange = (value, id) => {
        const index = activeOrder.items.findIndex(el => el.id === id);
        const newActiveOrder = cloneDeep(activeOrder);

        newActiveOrder.items[index].comment = value;

        setActiveOrder(newActiveOrder);
    };

    const handleDelete = id => () => {
        const newActiveOrder = { ...activeOrder };

        newActiveOrder.items = newActiveOrder.items.filter(el => el.id !== id);

        setActiveOrder(newActiveOrder);
    };

    const getPrice = product => {
        const city = activeOrder.address.city_sync_id.value;
        const price = product.prices?.find(el => el.city_sync_id === city)?.price || 0;

        return price;
    };

    const renderProducts = () => {
        return (
            <>
                <div className={styles.productsHeader}>
                    <p className={styles.productsHeaderTitle}>
                        Название
                    </p>

                    <p className={styles.productsHeaderTitle}>
                        Кол-во
                    </p>

                    <p className={styles.productsHeaderTitle}>
                        Цена
                    </p>
                </div>

                <div className={styles.products}>
                    {items.map(el => {
                        const product = {
                            ...products.find(p => p.id === el.product_id),
                            quantity : el.quantity,
                            comment  : el.comment,
                            address  : el.address
                        };

                        const price = getPrice(product);
                        const {
                            id,
                            image,
                            title_ru,
                            title_ua,
                            quantity,
                            comment
                        } = product;


                        return (
                            <Product
                                key={id}
                                image={image || ''}
                                title={title_ru || title_ua}
                                price={price}
                                quantity={quantity}
                                comment={comment || ''}
                                onInputChange={({ value }) => handleInputChange(value, id)}
                                onDelete={handleDelete(id)}
                            />
                        );
                    })}
                </div>
            </>
        );
    };

    const renderFooter = () => {
        const total = activeOrder.items.reduce((prev, curr) => {
            const price = getPrice(curr) * curr.quantity;

            return prev + price;
        }, 0);

        return (
            <div className={styles.footer}>
                <div className={styles.footerItem}>
                    <span className={styles.footerTitle}>
                        Общее
                    </span>

                    <span className={styles.footerValue}>
                        {total.toFixed(2)}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Button
                className={`${styles.addProduct} font-500`}
                mode='secondary'
                label='Добавить блюдо'
                onClick={handleShowProductsModal}
            />

            {renderProducts()}
            {renderFooter()}
        </div>
    );
}

SecondStep.propTypes = {
    modals         : PropTypes.array.isRequired,
    openModal      : PropTypes.func.isRequired,
    activeOrder    : PropTypes.object.isRequired,
    setActiveOrder : PropTypes.func.isRequired,
    products       : PropTypes.array.isRequired
};

export default React.memo(SecondStep);
