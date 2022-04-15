/*  no-unused-vars */
/*  camelcase */
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './ThirdStep.module.scss';

const HISTORY_TITLE_CONFIG = {
    new          : 'Заказ создан',
    cooking      : 'Готовится',
    preparing    : 'Доставляется',
    for_delivery : 'Доставлен',
    closed       : 'Закрыт',
    rejected     : 'Отменён'
};

function SecondStep({ activeOrder, openModal, modals }) {
    const renderHistory = () => {
        const { history } = activeOrder;

        return history.map(el => {
            const { id, status, set_at } = el;

            return (
                <div
                    key={id}
                    className={styles.historyItem}
                >
                    <p className={styles.status}>{HISTORY_TITLE_CONFIG[status]}</p>
                    <p className={styles.time}>{moment(set_at).format('HH:MM')}</p>
                </div>
            );
        });
    };

    return (
        <div className={styles.container}>
            {renderHistory()}
        </div>
    );
}

SecondStep.propTypes = {
    modals      : PropTypes.array.isRequired,
    openModal   : PropTypes.func.isRequired,
    activeOrder : PropTypes.object.isRequired
};

export default React.memo(SecondStep);
