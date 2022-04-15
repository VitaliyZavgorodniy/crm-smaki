/*  no-magic-numbers */
import PropTypes from 'prop-types';
import React from 'react';

import Input from '../../../ui-kit/Input';
import styles from './Product.module.scss';

const STATUS_CONFIG = {
    new : {
        title : 'Готовится',
        color : '#FF5858'
    },
    ready : {
        title : 'Готово',
        color : '#03A000'
    }
};

function Product({ image, title, price, quantity, comment, status, onInputChange }) {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.cell}>
                    <div className={styles.imageContainer}>
                        <img
                            src={image}
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.text}>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.price}>{price.toFixed(2)}</p>
                    </div>
                </div>

                <div className={styles.priceContainer}>
                    <p
                        className={styles.totalPrice}
                        style={{ color: STATUS_CONFIG[status]?.color }}
                    >{STATUS_CONFIG[status].title}
                    </p>
                </div>

                <div className={styles.countContainer}>
                    <p className={styles.quantity}>{quantity}</p>
                </div>
            </div>

            <div className={styles.bottom}>
                <Input
                    className={styles.input}
                    value={comment}
                    placeholder='Добавить комментарий..'
                    mode='secondary'
                    isShowError={false}
                    onChange={onInputChange}
                />
            </div>
        </div>
    );
}

Product.propTypes = {
    image         : PropTypes.string.isRequired,
    title         : PropTypes.string.isRequired,
    price         : PropTypes.number.isRequired,
    quantity      : PropTypes.number.isRequired,
    comment       : PropTypes.string.isRequired,
    status        : PropTypes.string.isRequired,
    onInputChange : PropTypes.func.isRequired
};

export default React.memo(Product);
