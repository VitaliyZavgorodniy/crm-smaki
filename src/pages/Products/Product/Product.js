/*  no-magic-numbers */
import PropTypes from 'prop-types';
import React from 'react';

import history from 'constants/history';
import Button from '../../../components/ui-kit/Button';
import SvgIcon from '../../../components/ui-kit/SvgIcon';
import styles from './Product.module.scss';

function Product({
    image,
    titleRu,
    weight,
    restaurant,
    descriptionRu,
    article,
    id
}) {
    const handleProductClick = () => history.push(`/products/${id}`);

    return (
        <div className={styles.product}>
            <div className={styles.front}>
                <div className={styles.frontTop}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.productImage}
                            src={image}
                            alt='product'
                        />
                    </div>

                    <div className={styles.text}>
                        <p className={`${styles.title} font-100`}>
                            {titleRu}
                        </p>

                        <p className={`${styles.weight} font-100`}>
                            {weight.toFixed(2)}
                        </p>
                    </div>

                    <div
                        className={styles.back}
                        onClick={handleProductClick}
                    >
                        <div className={styles.backTop}>
                            <SvgIcon
                                type={restaurant}
                                className={styles.restaurantLogo}
                            />

                            <p className={`${styles.title} font-100`}>
                                {titleRu}
                            </p>

                            <p className={`${styles.description} font-100`}>
                                {descriptionRu || 'Описание отсутствует'}
                            </p>

                            <p className={`${styles.title} font-100`}>
                                Артикль: {article}
                            </p>
                        </div>

                        <div className={styles.backBottom}>
                            <SvgIcon type='fingerTouch' />
                        </div>
                    </div>
                </div>

                <Button
                    className={styles.editButton}
                    label='Редактировать'
                    mode='secondary'
                    leftIcon='editPen'
                    onClick={handleProductClick}
                />
            </div>
        </div>
    );
}

Product.propTypes = {
    image         : PropTypes.string.isRequired,
    titleRu       : PropTypes.string.isRequired,
    weight        : PropTypes.number.isRequired,
    restaurant    : PropTypes.string.isRequired,
    descriptionRu : PropTypes.string,
    article       : PropTypes.string.isRequired,
    id            : PropTypes.string.isRequired
};

Product.defaultProps = {
    descriptionRu : ''
};

export default React.memo(Product);
