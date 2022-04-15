/*  no-magic-numbers */
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Product.module.scss';

function Product({ image, title, description, price, onClick }) {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imageContainer}>
                    <img
                        src={image}
                        className={styles.image}
                    />
                </div>

                <div className={styles.text}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.price}>{price.toFixed(2)}</p>
                </div>
            </div>

            <div
                className={styles.right}
                onClick={onClick}
            >
                <p>+</p>
            </div>
        </div>
    );
}

Product.propTypes = {
    image       : PropTypes.string.isRequired,
    title       : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    price       : PropTypes.number.isRequired,
    onClick     : PropTypes.func.isRequired
};

export default React.memo(Product);
