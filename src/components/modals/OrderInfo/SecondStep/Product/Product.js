/*  no-magic-numbers */
import PropTypes from 'prop-types';
import React from 'react';

import Input from '../../../../ui-kit/Input';
import SvgIcon from '../../../../ui-kit/SvgIcon';
import styles from './Product.module.scss';

function Product({ image, title, price, quantity, comment, onInputChange, onDelete }) {
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

                <div className={styles.countContainer}>
                    <p className={styles.quantity}>{quantity}</p>
                </div>

                <div className={styles.priceContainer}>
                    <p className={styles.totalPrice}>{(price * quantity).toFixed(2)}</p>
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

                <div
                    className={styles.icon}
                    onClick={onDelete}
                >
                    <SvgIcon type='basket' />
                </div>
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
    onInputChange : PropTypes.func.isRequired,
    onDelete      : PropTypes.func.isRequired
};

export default React.memo(Product);
