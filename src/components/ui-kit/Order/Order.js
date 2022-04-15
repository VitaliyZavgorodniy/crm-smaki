/*  camelcase */
import PropTypes from 'prop-types';
import React from 'react';

import Go from '../../../assets/icons/go.png';
import Smaki from '../../../assets/icons/smaki.png';
import { getDateDifference } from '../../../utils/helpers/date';
import styles from './Order.module.scss';

const LOGO_CONFIG = {
    smaki : Smaki,
    go    : Go
};

const OPERATOR_STATUSES_CONFIG = {
    new          : '#03A000',
    cooking      : 'linear-gradient(90deg, #EC6F66 0%, #F3A183 100%)',
    preparing    : 'linear-gradient(90deg, #E65C00 0%, #F9D423 100%)',
    for_delivery : 'linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)',
    closed       : 'linear-gradient(90deg, #DA22FF 0%, #9733EE 100%)',
    rejected     : 'linear-gradient(90deg, #283048 0%, #859398 100%)'
};

const ADMIN_STATUSES_CONFIG = {
    new          : '#03A000',
    cooking      : '#FF5858',
    preparing    : '#EAA800',
    for_delivery : '#0072FF',
    closed       : '#9733EE',
    rejected     : '#859398'
};

function Order({
    userRole,
    createdAt,
    restaurant,
    clientName,
    clientPhone,
    statusTitle,
    kitchenTitle,
    cityTitle,
    address,
    id,
    status,
    deliveredTill,
    paymentTypes,
    items,
    paymentType,
    handleOrderClick
}) {
    const getCookingCount = () => {
        const completed = items.filter(el => el.status !== 'new').length;
        const total = items.length;

        return { completed, total };
    };

    const getTime = date => {
        const { hours, minutes } = getDateDifference(date);
        const timeSymbol = +minutes < 0 || +hours < 0 ? '-' : '+';
        const time = `${timeSymbol} ${`${hours}`.replace('-', '')}:${minutes.replace('-', '')}`;

        return time;
    };

    const getPaymentDetails = () => {
        const type = paymentTypes.find(el => el.name === paymentType).title;
        const total = items.reduce((prev, curr) => prev + curr.sum, 0);

        return `${type} (${total})`;
    };

    const renderCallCenterOrder = () => {
        return (
            <div
                key={createdAt}
                className={styles.operatorOrder}
                onClick={handleOrderClick}
            >
                <div className={styles.iconContainer}>
                    <img
                        src={LOGO_CONFIG[restaurant]}
                        className={styles.logo}
                    />
                </div>

                <div className={styles.orderSection}>
                    <div
                        className={styles.operatorStatus}
                        style={{
                            background : OPERATOR_STATUSES_CONFIG[status]
                        }}
                    >
                        <p className={styles.statusText}>{statusTitle}</p>
                    </div>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{`#${id}`}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{kitchenTitle}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{cityTitle}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{address}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{clientName}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{clientPhone}</p>
                </div>
            </div>
        );
    };

    const renderAdminOrder = () => {
        const time = getTime(deliveredTill);
        const paymentDetails = getPaymentDetails(paymentType);
        const totalPrice = items.reduce((prev, curr) => prev + curr.sum, 0);
        const { completed, total } = getCookingCount(items);

        return (
            <div
                className={styles.adminOrder}
                onClick={handleOrderClick}
            >
                <div className={styles.orderSection}>
                    <div
                        className={styles.adminStatus}
                        style={{
                            background : ADMIN_STATUSES_CONFIG[status]
                        }}
                    >
                        <p className={styles.statusText}>{time}</p>
                    </div>
                </div>

                <div className={styles.orderSection}>
                    <p
                        className={styles.orderText}
                        style={{
                            color : completed === total
                                ? ADMIN_STATUSES_CONFIG.new
                                : ADMIN_STATUSES_CONFIG.cooking
                        }}
                    >{`${completed}/${total}`}
                    </p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{clientName}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{clientPhone}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{address}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{paymentDetails}</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>0</p>
                </div>

                <div className={styles.orderSection}>
                    <p className={styles.orderText}>{totalPrice}</p>
                </div>
            </div>
        );
    };

    const renderOrder = () => {
        const RENDERERS = {
            call_center_operator : renderCallCenterOrder,
            administrator        : renderAdminOrder,
            manager              : renderAdminOrder
        };

        if (RENDERERS[userRole]) {
            return RENDERERS[userRole]();
        }
    };

    return (
        <>
            {renderOrder()}
        </>
    );
}

Order.propTypes = {
    userRole         : PropTypes.string.isRequired,
    createdAt        : PropTypes.string.isRequired,
    restaurant       : PropTypes.string.isRequired,
    clientName       : PropTypes.string.isRequired,
    clientPhone      : PropTypes.number.isRequired,
    statusTitle      : PropTypes.string.isRequired,
    kitchenTitle     : PropTypes.string.isRequired,
    cityTitle        : PropTypes.string.isRequired,
    address          : PropTypes.string.isRequired,
    id               : PropTypes.number.isRequired,
    status           : PropTypes.string.isRequired,
    deliveredTill    : PropTypes.string,
    paymentTypes     : PropTypes.array.isRequired,
    items            : PropTypes.array.isRequired,
    paymentType      : PropTypes.string.isRequired,
    handleOrderClick : PropTypes.func.isRequired
};

Order.defaultProps = {
    deliveredTill : ''
};

export default Order;
