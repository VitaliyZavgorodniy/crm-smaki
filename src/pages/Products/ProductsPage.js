/*  camelcase */
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import NavigationTabs from '../../components/ui-kit/NavigationTabs/NavigationTabs';
import Loader from '../../components/ui-kit/Spiner';
import Product from './Product';
import styles from './ProductsPage.module.scss';
import { RESTAURANT_TYPES } from './utils';

function ProductsPage({
    isFetching,
    products,
    productCategories,
    getProducts
}) {
    const [ activeProductTabIndex, setActiveProductTabIndex ] = useState(0);
    const [ activeKitchenTabIndex, setActiveKitchenTabIndex ] = useState(0);
    const [ requestParams, setRequestParams ] = useState({
        restaurant : RESTAURANT_TYPES[0].key,
        per_page   : 500
    });

    const renderTabs = (tabs, activeTabIndex, changeKey, disabledTabs) => {
        return (
            <div className={styles.tabs}>
                <NavigationTabs
                    tabs={tabs}
                    tabMode='light'
                    activeTabIndex={activeTabIndex}
                    disabledTabs={disabledTabs}
                    onTabClick={handleTabClick(changeKey)}
                />
            </div>
        );
    };

    const renderProducts = () => {
        return products.map(el => {
            const {
                image,
                title_ru,
                title_ua,
                weight,
                weight_type,
                restaurant,
                description_ru,
                description_ua,
                article,
                id
            } = el;

            return (
                <Product
                    key={article}
                    image={image}
                    titleRu={title_ru}
                    titleUa={title_ua}
                    weight={weight}
                    weightType={weight_type}
                    restaurant={restaurant}
                    descriptionRu={description_ru}
                    descriptionUa={description_ua}
                    article={article}
                    id={id}
                />
            );
        });
    };

    const handleTabClick = changeKey => ({ tab, index }) => {
        const newParams = { ...requestParams, [changeKey]: tab.key };

        switch (changeKey) {
            case 'restaurant': {
                setActiveKitchenTabIndex(index);

                break;
            }

            default: {
                setActiveProductTabIndex(index);
                break;
            }
        }

        if (newParams[changeKey] === 'all') {
            delete newParams[changeKey];
        }

        if (newParams[changeKey] !== requestParams[changeKey]) {
            setRequestParams(newParams);
            updateProducts(newParams);
        }
    };

    const updateProducts = params => {
        getProducts(params);
    };

    if (isFetching) {
        return (
            <div className={styles.loader}>
                <Loader color='orange' width={40} height={40} />
            </div>
        );
    }

    return (
        <div className={styles.products}>
            <div className={styles.header}>
                {renderTabs(productCategories, activeProductTabIndex, 'category_sync_id')}
                {renderTabs(RESTAURANT_TYPES, activeKitchenTabIndex, 'restaurant')}
            </div>

            <div className={styles.body}>
                {renderProducts()}
            </div>
        </div>
    );
}

ProductsPage.propTypes = {
    isFetching        : PropTypes.bool.isRequired,
    products          : PropTypes.array.isRequired,
    getProducts       : PropTypes.func.isRequired,
    productCategories : PropTypes.array.isRequired
};

export default React.memo(ProductsPage);
