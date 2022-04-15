/*  camelcase */
/*  react/no-multi-comp */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Input from '../../ui-kit/Input';
import NavigationTabs from '../../ui-kit/NavigationTabs/NavigationTabs';
import Spiner from '../../ui-kit/Spiner';
import Base from '../Base';
import Product from './Product';
import styles from './Products.module.scss';

function Products({
    products,
    productCategories,
    getProducts,
    isFetching,
    activeOrder,
    setActiveOrder,
    updateProductsSearchQuery
}) {
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ activeTabIndex, setActiveTabIndex ] = useState(0);
    const [ requestParams, setRequestParams ] = useState({
        per_page   : 500,
        restaurant : activeOrder.restaurant
    });

    useEffect(async () => {
        handleTabClick({ tab: productCategories[activeTabIndex], index: activeTabIndex });
        setIsInitialized(true);
    }, []);

    const handleSearchChange = ({ value }) => {
        updateProductsSearchQuery(value);
        setSearchQuery(value);
    };

    const handleClearClick = () => {
        updateProductsSearchQuery('');
        setSearchQuery('');
    };

    const handleTabClick = ({ tab, index }) => {
        const newParams = {
            ...requestParams,
            category_sync_id : tab.key,
            restaurant       : activeOrder.restaurant.value
        };

        if (tab.key === 'all') {
            delete newParams.category_sync_id;
        }

        setRequestParams(newParams);
        setActiveTabIndex(index);
        updateProducts(newParams);
    };

    const updateProducts = async params => {
        setIsInitialized(false);
        await getProducts(params);
        setIsInitialized(true);
    };

    const handleProductClick = product => () => {
        const newActiveOrder = {
            ...activeOrder,
            items : [ ...activeOrder.items ]
        };

        const itemIndex = newActiveOrder.items
            .findIndex(el => el.id === product.id || el.product_id === product.id);

        if (itemIndex >= 0) {
            const productIndex = products
                .findIndex(el => el.id === newActiveOrder.items[itemIndex].id
                    || newActiveOrder.items[itemIndex].product_id);
            const currentItem = { ...newActiveOrder.items[itemIndex] };
            const currentProduct = { ...products[productIndex] };

            newActiveOrder.items[itemIndex] = {
                ...currentItem,
                ...currentProduct,
                product_id : currentItem.product_id,
                quantity   : currentItem.quantity + 1
            };
        } else {
            newActiveOrder.items.push({
                ...product,
                quantity   : 1,
                comment    : '',
                product_id : product.id
            });
        }

        setActiveOrder(newActiveOrder);
    };

    const getSearchIcons = () => {
        if (searchQuery) {
            return { iconleft: 'searchLight', iconright: 'close' };
        }

        return { iconleft: 'search' };
    };

    const getPrice = product => {
        const city = activeOrder.address.city_sync_id.value;
        const { price } = product.prices.find(el => el.city_sync_id === city);

        return price;
    };

    const renderProducts = () => {
        if (isFetching || !isInitialized) {
            return (
                <div className={styles.loader}>
                    <Spiner color='orange' />
                </div>
            );
        }

        return (
            <div className={styles.products}>
                {products.map(el => {
                    const price = getPrice(el);
                    const {
                        id,
                        image,
                        title_ru,
                        title_ua,
                        description_ru,
                        description_ua
                    } = el;

                    return (
                        <Product
                            key={id}
                            image={image}
                            title={title_ru || title_ua}
                            description={description_ru || description_ua}
                            price={price}
                            onClick={handleProductClick(el)}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles.productsModal}>
            <Base
                configuration={{
                    name   : 'productCreate',
                    fields : [
                        {
                            type              : 'customField',
                            renderCustomField : () => (
                                <div className={styles.header}>
                                    <span className={`${styles.header__title} font-600`}>Меню</span>

                                    <Input
                                        isShowError={false}
                                        className={styles.header__input}
                                        value={searchQuery}
                                        placeholder='Суши, нори, пицца Гавайская'
                                        onRightIconClick={handleClearClick}
                                        onChange={handleSearchChange}
                                        mode='secondary'
                                        {...getSearchIcons()}
                                    />
                                </div>
                            )
                        },
                        {
                            type              : 'customField',
                            renderCustomField : () => (
                                <NavigationTabs
                                    tabs={productCategories}
                                    activeTabIndex={activeTabIndex}
                                    onTabClick={handleTabClick}
                                />
                            )
                        },
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

Products.propTypes = {
    products                  : PropTypes.array.isRequired,
    productCategories         : PropTypes.array.isRequired,
    getProducts               : PropTypes.func.isRequired,
    isFetching                : PropTypes.bool.isRequired,
    activeOrder               : PropTypes.object.isRequired,
    setActiveOrder            : PropTypes.func.isRequired,
    updateProductsSearchQuery : PropTypes.func.isRequired
};

export default React.memo(Products);
