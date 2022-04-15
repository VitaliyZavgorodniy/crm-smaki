/*  camelcase */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import history from 'constants/history';
import { validateProduct } from '../../utils/validation';
import Button from '../../components/ui-kit/Button';
import Input from '../../components/ui-kit/Input';
import Radio from '../../components/ui-kit/Radio';
import Select from '../../components/ui-kit/Select';
import SvgIcon from '../../components/ui-kit/SvgIcon';
import styles from './ProductPage.module.scss';

const RESTAURANTS = [
    { id: 0, label: 'Smaki Maki', value: 'smaki' },
    { id: 1, label: 'Sushi Go', value: 'go' }
];

const RADIO_SCHEME = [
    { value: '1', label: 'Активен' },
    { value: '0', label: 'Неактивен' }
];

function ProductPage({
    editedProduct,
    productTypes,
    cities,
    updateProduct
}) {
    const fileInputRef = useRef();

    const categories = productTypes
        .map((el, id) => ({ id, label: el.name, value: el.sync_id }));

    const [ isLoading, setIsLoading ] = useState(false);

    const [ errors, setErrors ] = useState({
        title_ua       : '',
        title_ru       : '',
        description_ua : '',
        description_ru : ''
    });

    const [ inputs, setInputs ] = useState({
        ...editedProduct,
        type_sync_id   : editedProduct?.type?.sync_id || categories[0].value,
        description_ru : editedProduct?.description_ru || '',
        description_ua : editedProduct?.description_ua || ''
    });

    const [ restaurantsData, setRestaurantsData ] = useState({
        restaurants       : [ ...RESTAURANTS ],
        choosenRestaurant : {}
    });

    const [ categoriesData, setCategoriesData ] = useState({
        productTypes    : Array.isArray(productTypes) ? productTypes : [],
        choosenCategory : {}
    });

    useEffect(() => {
        prepareSelectData();
    }, []);

    const prepareSelectData = () => {
        const choosenRestaurant = RESTAURANTS.find(el => el.value === inputs.restaurant);
        const choosenCategory = categories.find(el => el.value === inputs?.category?.sync_id)
            || categories[0];

        handleInputsChange({ valueKey: 'restaurant', value: choosenRestaurant });
        handleInputsChange({ valueKey: 'category_sync_id', value: choosenCategory });

        setRestaurantsData(prev => ({ ...prev, choosenRestaurant }));
        setCategoriesData(prev => ({
            ...prev,
            choosenCategory,
            productTypes : categories
        }));
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        const blob = new Blob([ file ], { type: file.type });
        const objectURL = URL.createObjectURL(blob);

        handleInputsChange({ value: objectURL, valueKey: 'image' });
    };

    const handleInputsChange = ({ value, valueKey }, cityUuid) => {
        switch (valueKey) {
            case 'title_ru':
            case 'title_ua':
            case 'description_ru':
            case 'description_ua':
            case 'image': {
                setInputs(prev => ({ ...prev, [valueKey]: value }));
                break;
            }

            case 'restaurant': {
                setInputs(prev => ({ ...prev, [valueKey]: value.value }));
                setRestaurantsData(prev => ({ ...prev, choosenRestaurant: value }));
                break;
            }

            case 'category_sync_id': {
                setInputs(prev => ({ ...prev, category_sync_id: value.value }));
                setCategoriesData(prev => ({ ...prev, choosenCategory: value }));
                break;
            }

            case 'is_active':
            case 'price':
            case 'price_old': {
                const isPrice = valueKey !== 'is_active';
                const prices = inputs.prices.map(el => {
                    const price = { ...el };
                    const isTargetPrice = price.city_sync_id === cityUuid;

                    if (isTargetPrice && isPrice) {
                        price[valueKey] = +value;
                    }

                    if (isTargetPrice && !isPrice) {
                        price[valueKey] = +value.value;
                    }

                    return price;
                });

                setInputs(prev => ({ ...prev, prices }));
                break;
            }

            default:
                break;
        }

        setErrors(prev => ({ ...prev, [valueKey]: '' }));
    };

    const handleUploadFile = () => {
        fileInputRef.current.click();
    };

    const handleSave = () => {
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        const product = {
            title_ua         : inputs.title_ua,
            title_ru         : inputs.title_ru,
            description_ua   : inputs.description_ua,
            description_ru   : inputs.description_ru,
            category_sync_id : inputs.category_sync_id,
            type_sync_id     : inputs.type_sync_id,
            restaurant       : inputs.restaurant,
            prices           : inputs.prices,
            id               : inputs.id
        };

        if (file) {
            formData.append('image', file, file.name);
        }

        validateProduct({
            data      : product,
            onSuccess : async () => {
                setIsLoading(true);
                await updateProduct(product, file ? formData : undefined);
                setIsLoading(false);

                history.goBack();
            },
            onError : validationErrors => setErrors(validationErrors)
        });
    };

    const renderHeader = () => {
        return (
            <div
                className={styles.imageContainer}
                onClick={handleUploadFile}
            >
                {inputs.image && (
                    <img
                        alt='product'
                        src={inputs.image}
                        className={styles.image}
                    />
                )}

                <div className={styles.addImage}>
                    <SvgIcon type='addImage' />
                </div>

                <input
                    ref={fileInputRef}
                    type='file'
                    accept='.png,.jpg,.jpeg'
                    onChange={handleFileChange}
                    hidden
                />
            </div>
        );
    };

    const renderPrices = () => {
        return inputs?.prices?.map((item, index) => {
            const city = cities.find(el => el.sync_id === item.city_sync_id);
            const { uuid, name } = city;
            const { price, price_old, city_sync_id } = item;

            return (
                <div
                    key={uuid}
                    className={styles.pricesItem}
                >
                    <p className={styles.city}>{name}</p>

                    <div className={styles.pricesInputs}>
                        <Input
                            className={styles.input}
                            label='Цены'
                            subLabel='(UAH)'
                            placeholder='Цена'
                            value={`${price}`}
                            valueKey='price'
                            type='number'
                            onChange={props => handleInputsChange({ ...props }, city_sync_id)}
                        />

                        <Input
                            className={styles.input}
                            label='Старая цена'
                            subLabel='(UAH)'
                            placeholder='Старая цена'
                            value={`${price_old}`}
                            valueKey='price_old'
                            type='number'
                            onChange={props => handleInputsChange({ ...props }, city_sync_id)}
                        />
                    </div>

                    <div className={styles.pricesRadioButtons}>
                        {index === 0 && (
                            <p className={styles.radioTitle}>
                                Активность
                                <span> (Будет ли товар виден на сайте)</span>
                            </p>
                        )}

                        <div
                            className={
                                `${styles.radioButtonsItem} ${index === 0 && styles.firstRadio}`
                            }
                        >
                            <Radio
                                items={RADIO_SCHEME}
                                valueKey='is_active'
                                value={`${item.is_active}`}
                                onChange={props => handleInputsChange({ ...props }, city_sync_id)}
                            />
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {renderHeader()}

                <Button
                    className={styles.button}
                    label='Сохранить'
                    onClick={handleSave}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                />
            </div>

            <div className={styles.body}>
                <div>
                    <Select
                        className={styles.input}
                        onChange={handleInputsChange}
                        selectOptions={restaurantsData.restaurants}
                        selectedOption={restaurantsData.choosenRestaurant}
                        valueKey='restaurant'
                        mode='primary'
                        label='Ресторан'
                    />

                    <Input
                        className={styles.input}
                        label='Артикул'
                        subLabel='(Нередактируемое поле)'
                        value={inputs.article}
                        readOnly
                    />
                </div>

                <div>
                    <Input
                        className={styles.input}
                        label='Название на русском'
                        placeholder='Название товара'
                        value={inputs.title_ru}
                        valueKey='title_ru'
                        error={errors.title_ru}
                        onChange={handleInputsChange}
                    />

                    <Input
                        className={styles.input}
                        label='Описание товара'
                        subLabel='(Рус)'
                        placeholder='Описание товара'
                        value={inputs.description_ru || ''}
                        valueKey='description_ru'
                        error={errors.description_ru}
                        onChange={handleInputsChange}
                    />
                </div>

                <div>
                    <Input
                        className={styles.input}
                        label='Назва українською'
                        placeholder='Назва товару'
                        value={inputs.title_ua}
                        valueKey='title_ua'
                        error={errors.title_ua}
                        onChange={handleInputsChange}
                    />

                    <Input
                        className={styles.input}
                        label='Опис товару'
                        placeholder='Опис товару'
                        subLabel='(Укр)'
                        value={inputs.description_ua || ''}
                        valueKey='description_ua'
                        error={errors.description_ua}
                        onChange={handleInputsChange}
                    />
                </div>
            </div>

            <div className={styles.body}>
                <div>
                    <Input
                        className={styles.input}
                        label='Вес'
                        subLabel='(Нередактируемое поле, Граммы)'
                        value={`${inputs.weight}`}
                        readOnly
                    />
                </div>

                <div>
                    <Input
                        className={styles.input}
                        label='Тип веса'
                        subLabel='(Нередактируемое поле)'
                        value={inputs.weight_type}
                        readOnly
                    />
                </div>

                <div>
                    <Select
                        className={styles.input}
                        onChange={handleInputsChange}
                        selectOptions={categoriesData.productTypes}
                        selectedOption={categoriesData.choosenCategory}
                        valueKey='category_sync_id'
                        mode='primary'
                        label='Тип товара'
                    />
                </div>
            </div>

            <div className={styles.prices}>
                {renderPrices()}
            </div>
        </div>
    );
}

ProductPage.propTypes = {
    editedProduct : PropTypes.object,
    productTypes  : PropTypes.array.isRequired,
    cities        : PropTypes.array.isRequired,
    updateProduct : PropTypes.func.isRequired
};

ProductPage.defaultProps = {
    editedProduct : {}
};

export default ProductPage;
