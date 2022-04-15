/*  camelcase */

import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Select from '../../../ui-kit/Select';
import Spiner from '../../../ui-kit/Spiner';
import styles from './ThirdStep.module.scss';

function ThirdStep({
    setActiveOrder,
    activeOrder,
    timeTypes,
    operators,
    couriers,
    cooks,
    errors,
    onInputChange
}) {
    const [ inputs, setInputs ] = useState({
        operator   : null,
        courier_id : null,
        type       : null,
        cook       : null
    });

    useEffect(() => {
        if (operators[0]) {
            setInputs(() => {
                return {
                    operator   : operators[0],
                    courier_id : activeOrder.courier_id || couriers[0],
                    type       : activeOrder.type || timeTypes[0],
                    cook       : activeOrder.cook || cooks[0]
                };
            });
        }
    }, [ operators ]);

    const renderSpiner = () => {
        return (
            <div className={styles.loader}>
                <Spiner color='orange' />
            </div>
        );
    };

    const handleInputChange = ({ value, valueKey }) => {
        const newInputs = { ...inputs };
        const newEditedOrder = cloneDeep(activeOrder);

        switch (valueKey) {
            case 'type':
            case 'courier_id':
            case 'cook':
                newEditedOrder[valueKey] = value;
                break;

            default:
                break;
        }

        if (valueKey === 'courier_id' || valueKey === 'cook') {
            onInputChange({ valueKey });
        }

        newInputs[valueKey] = value;

        setActiveOrder(newEditedOrder);
        setInputs(prev => ({ ...prev, [valueKey]: value }));
    };

    return (
        <div className={styles.container}>
            {!inputs.operator && renderSpiner()}

            {!!inputs.operator && (
                <Select
                    selectOptions={operators}
                    selectedOption={inputs.operator}
                    valueKey='operator'
                    label='Оператор'
                    onChange={handleInputChange}
                />
            )}

            {/* {!!inputs.type && (
                <Select
                    selectOptions={timeTypes}
                    selectedOption={inputs.type}
                    valueKey='type'
                    label='Доставка'
                    onChange={handleInputChange}
                />
            )} */}

            {!!inputs.cook && (
                <Select
                    selectOptions={cooks}
                    selectedOption={inputs.cook}
                    valueKey='cook'
                    label='Повар'
                    onChange={handleInputChange}
                    error={errors.cook}
                />
            )}

            {!!inputs.courier_id && (
                <Select
                    selectOptions={couriers}
                    selectedOption={inputs.courier_id}
                    valueKey='courier_id'
                    label='Курьер'
                    onChange={handleInputChange}
                    error={errors.courier_id}
                />
            )}
        </div>
    );
}

ThirdStep.propTypes = {
    setActiveOrder : PropTypes.func.isRequired,
    activeOrder    : PropTypes.object.isRequired,
    timeTypes      : PropTypes.array.isRequired,
    operators      : PropTypes.array.isRequired,
    couriers       : PropTypes.array.isRequired,
    cooks          : PropTypes.array.isRequired,
    errors         : PropTypes.object.isRequired,
    onInputChange  : PropTypes.func.isRequired
};

export default React.memo(ThirdStep);
