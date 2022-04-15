/*  no-magic-numbers */
/*  more/no-duplicated-chains */

/*  camelcase */
/*  react/no-multi-comp */
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { ADMIN_ORDER_INFO_TABS } from '../../../constants/modals';
import {
    validateFirstStepOrder,
    validateSecondStepOrder,
    validateThirdStepOrder
} from '../../../utils/validation';
import Button from '../../ui-kit/Button';
import NavigationTabs from '../../ui-kit/NavigationTabs';
import SvgIcon from '../../ui-kit/SvgIcon';
import Base from '../Base';
import styles from './AdminOrderInfo.module.scss';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';

const STEPS_CONFIG = {
    0 : FirstStep,
    1 : SecondStep,
    2 : ThirdStep
};

function OrderInfo({
    closeAllModals,
    removeActiveOrder,
    modals,
    activeOrder,
    createOrder,
    orderStatus,
    updateOrder,
    getFullUsers,
    fullUsers,
    setActiveOrder
}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ activeTabIndex, setActiveTabIndex ] = useState(0);
    const [ errors, setErrors ] = useState({
        0 : {
            address : {
                street       : '',
                house_number : '',
                entrance     : '',
                floor        : ''
            },
            client : {
                name  : '',
                phone : ''

            }
        },
        1 : {
            courier_id : '',
            cook       : ''
        },
        2 : {}
    });

    const [ steps, setSteps ] = useState({
        0 : { isCanOpen: true },
        1 : { isCanOpen: false },
        2 : { isCanOpen: false }
    });

    useEffect(() => {
        handleUpdateSteps(activeTabIndex);
    }, [ activeOrder ]);

    useEffect(() => {
        getFullUsers();
    }, []);

    useEffect(() => {
        if (fullUsers && orderStatus === 'edit' && typeof activeOrder.courier_id !== 'object') {
            const courier =
                fullUsers.find(el =>
                    el.role_name === 'courier'
                    && el.id === activeOrder.courier_id
                );

            setActiveOrder({
                ...activeOrder,
                courier_id : {
                    value : courier.id, label : `${courier.first_name} ${courier.last_name}`
                }
            });
        }
    }, [ fullUsers ]);

    const handleUpdateSteps = step => {
        const STEPS_VALIDATION_CONFIG = {
            0 : {
                data : {
                    ...activeOrder,
                    client : {
                        ...activeOrder.client,
                        phone : activeOrder.client.phone?.label || activeOrder.client.phone
                    }
                },
                method        : validateFirstStepOrder,
                successConfig : {
                    0 : { isCanOpen: true },
                    1 : { isCanOpen: true },
                    2 : { isCanOpen: false }
                },
                errorConfig : {
                    0 : { isCanOpen: true },
                    1 : { isCanOpen: false },
                    2 : { isCanOpen: false }
                }
            },
            1 : {
                data          : { id: activeOrder.items[0]?.id },
                method        : validateSecondStepOrder,
                successConfig : {
                    0 : { isCanOpen: true },
                    1 : { isCanOpen: true },
                    2 : { isCanOpen: true }
                },
                errorConfig : {
                    0 : { isCanOpen: true },
                    1 : { isCanOpen: true },
                    2 : { isCanOpen: false }
                }
            },
            2 : {}
        };

        const {
            data,
            method,
            successConfig,
            errorConfig
        } = STEPS_VALIDATION_CONFIG[step];

        if (data) {
            method({
                data,
                onSuccess : () => {
                    setSteps(successConfig);

                    if (STEPS_VALIDATION_CONFIG[step + 1]?.method) {
                        handleUpdateSteps(step + 1);
                    }
                },
                onError : () => {
                    setSteps(errorConfig);
                }
            });
        }
    };

    const prepareOrder = order => {
        const outputOrder = {
            ...cloneDeep(order)
        };

        outputOrder.address.city_sync_id = outputOrder.address.city_sync_id.value;
        outputOrder.client.phone = outputOrder.client.phone.label;
        outputOrder.client.source = outputOrder.client.source.value;
        outputOrder.courier_id = +outputOrder.courier_id.value;
        outputOrder.cook = +outputOrder.cook.value;
        outputOrder.kitchen_code = outputOrder.kitchen_code.value;
        outputOrder.payment_type = outputOrder.payment_type.value;
        outputOrder.restaurant = outputOrder.restaurant.value;
        outputOrder.type = outputOrder.type.value;
        outputOrder.status = outputOrder.status.value;

        if (outputOrder.client.id === '') {
            delete outputOrder.client.id;
        }

        delete outputOrder.delivered_till;

        return outputOrder;
    };

    const handleCloseModal = () => {
        closeAllModals();
        removeActiveOrder();
    };

    const handleInputChange = ({ valueKey, objectKey }) => {
        const newErrors = { ...errors };

        if (objectKey) {
            newErrors[activeTabIndex][objectKey][valueKey] = '';
        } else {
            newErrors[activeTabIndex][valueKey] = '';
        }

        setErrors(newErrors);
    };

    const handleTabClick = ({ index }) => setActiveTabIndex(index);

    const handleSubmit = () => {
        const newErrors = { ...errors };
        const actions = {
            create : createOrder,
            edit   : updateOrder
        };

        const action = actions[orderStatus];

        validateFirstStepOrder({
            data : {
                ...activeOrder,
                client : {
                    ...activeOrder.client,
                    phone : activeOrder.client.phone.label
                }
            },
            onSuccess : () => {
                handleUpdateSteps(1);

                validateThirdStepOrder({
                    data : {
                        courier_id : activeOrder.courier_id?.value,
                        cook       : activeOrder.cook?.value
                    },
                    onSuccess : async () => {
                        const order = prepareOrder(activeOrder);

                        setIsLoading(true);
                        await action(order);
                        setIsLoading(false);
                        handleCloseModal();
                    },
                    onError : error => {
                        setActiveTabIndex(1);
                        setErrors(prev => ({ ...prev, 1: { ...error } }));
                    }
                });
            },
            onError : error => {
                setErrors(() => ({ ...newErrors, 0: { ...error } }));
            }
        });
    };

    const getModalStyle = () => {
        const modalStyle = {
            1 : {
                borderRadius : '8px 0 0 8px',
                borderLeft   : '1px solid transparent'
            },
            2 : {
                borderRadius : '0 0 0 0',
                borderLeft   : '1px solid #EDA240'
            }
        };

        return modalStyle[modals.length];
    };

    const getDisabledTabs = () => {
        const output = [];

        Object.values(steps).forEach((el, index) => {
            if (!el.isCanOpen) {
                output.push(index);
            }
        });

        return output;
    };

    const renderStep = () => {
        const Component = STEPS_CONFIG[activeTabIndex];

        return (
            <Component
                key={Object.keys(errors[activeTabIndex]).length}
                errors={errors[activeTabIndex]}
                onInputChange={handleInputChange}
            />
        );
    };

    return (
        <div
            className={styles.orderInfo}
            style={getModalStyle()}
        >
            <Base
                configuration={{
                    fields : [
                        {
                            type              : 'customField',
                            renderCustomField : () => (
                                <div className={styles.header}>
                                    <div className={styles.header__info} />

                                    <div className={styles.iconsContainer}>
                                        <SvgIcon
                                            refreskKey={activeOrder.restaurant.value}
                                            type={activeOrder.restaurant.value}
                                            className={styles.logo}
                                        />

                                        <SvgIcon
                                            type='close'
                                            className={styles.header__close}
                                            onClick={handleCloseModal}
                                        />
                                    </div>
                                </div>
                            )
                        },
                        {
                            type              : 'customField',
                            renderCustomField : () => (
                                <NavigationTabs
                                    tabs={ADMIN_ORDER_INFO_TABS}
                                    activeTabIndex={activeTabIndex}
                                    onTabClick={handleTabClick}
                                    disabledTabs={getDisabledTabs()}
                                />
                            )
                        },
                        {
                            type              : 'customField',
                            renderCustomField : renderStep
                        },
                        {
                            type              : 'customField',
                            renderCustomField : () => (
                                <div className={styles.footer}>
                                    {activeTabIndex !== 1 && (
                                        <div className={styles.footer__line} />
                                    )}

                                    <Button
                                        className={`${styles['orderInfo__add-product']} font-500`}
                                        label='Передать на кухню'
                                        isLoading={isLoading}
                                        isDisabled={isLoading}
                                        onClick={handleSubmit}
                                    />
                                </div>
                            )
                        }
                    ]
                }}
            />
        </div>
    );
}

OrderInfo.propTypes = {
    closeAllModals    : PropTypes.func.isRequired,
    removeActiveOrder : PropTypes.func.isRequired,
    modals            : PropTypes.array.isRequired,
    activeOrder       : PropTypes.object.isRequired,
    createOrder       : PropTypes.func.isRequired,
    orderStatus       : PropTypes.string.isRequired,
    updateOrder       : PropTypes.func.isRequired,
    getFullUsers      : PropTypes.func.isRequired,
    fullUsers         : PropTypes.array,
    setActiveOrder    : PropTypes.func.isRequired
};

OrderInfo.defaultProps = {
    fullUsers : []
};

export default OrderInfo;
