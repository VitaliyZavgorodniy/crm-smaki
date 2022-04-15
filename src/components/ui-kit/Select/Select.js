import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import styles from './Select.module.scss';

const selectStyles = {
    primary : {
        option : (provided, state) => ({
            ...provided,
            color           : state.isSelected ? '#eda240' : '#DEDEDE',
            backgroundColor : '#FFFFFF',
            fontSize        : 14
        }),
        menu : provided => ({
            ...provided,
            backgroundColor : '#FFFFFF'
        }),
        container : provided => ({
            ...provided,
            backgroundColor : '#FFFFFF',
            borderRadius    : '10px',
            minHeight       : 42
        }),
        control : provided => ({
            ...provided,
            backgroundColor : '#FFFFFF',
            borderRadius    : '10px',
            minHeight       : 42,
            border          : '1px solid #DEDEDE'
        }),
        singleValue : provided => ({
            ...provided,
            color    : '#425466',
            fontSize : 14
        }),
        input : provided => ({
            ...provided,
            color : '#252525'
        })
    },
    secondary : {
        option : (provided, state) => ({
            ...provided,
            color           : state.isSelected ? '#eda240' : '#F0F0F0',
            backgroundColor : '#2d303e',
            fontSize        : 14
        }),
        menu : provided => ({
            ...provided,
            backgroundColor : '#2d303e'
        }),
        container : provided => ({
            ...provided,
            backgroundColor : '#2d303e',
            borderRadius    : '10px',
            minHeight       : 42
        }),
        control : provided => ({
            ...provided,
            backgroundColor : '#2d303e',
            borderRadius    : '10px',
            minHeight       : 42,
            border          : '0'
        }),
        singleValue : provided => ({
            ...provided,
            color    : '#FFFFFF',
            fontSize : 14
        }),
        input : provided => ({
            ...provided,
            color : '#FFFFFF'
        })
    }
};

function CustomSelect({
    selectOptions,
    selectedOption,
    inputValue,
    onChange,
    onInputChange,
    valueKey,
    isShowError,
    isSearchable,
    isLoading,
    error,
    label,
    mode,
    isMulti
}) {
    const handleChange = option => {
        onChange({ valueKey, value: option });
    };

    const handleInputChange = value => {
        onInputChange({ valueKey, value });
    };

    const handleBlur = () => {
        if (!isSearchable) {
            return;
        }

        const isOptions = !!selectOptions.length;

        if (!isOptions) {
            onChange({ valueKey, value: { value: '', label: inputValue, name: '' } });
        }
    };

    const getErrorClassName = () => {
        const className = error
            ? `${styles.select__error_visible}`
            : styles.select__error;

        return className;
    };

    return (
        <div className={`${styles.select} ${styles[mode]}`}>
            {label && (
                <p>{label}</p>
            )}

            <Select
                options={selectOptions}
                value={selectedOption}
                inputValue={inputValue}
                onChange={handleChange}
                onInputChange={handleInputChange}
                isSearchable={isSearchable}
                styles={selectStyles[mode]}
                isLoading={isLoading}
                isMulti={isMulti}
                onBlur={handleBlur}
            />

            {isShowError && (
                <p className={getErrorClassName()}>
                    {error || '.'}
                </p>
            )}
        </div>
    );
}

CustomSelect.propTypes = {
    selectOptions  : PropTypes.array.isRequired,
    selectedOption : PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    inputValue     : PropTypes.string,
    onChange       : PropTypes.func.isRequired,
    onInputChange  : PropTypes.func,
    isShowError    : PropTypes.bool,
    isSearchable   : PropTypes.bool,
    isLoading      : PropTypes.bool,
    valueKey       : PropTypes.string.isRequired,
    label          : PropTypes.string,
    error          : PropTypes.string,
    mode           : PropTypes.oneOf([ 'primary', 'secondary' ]),
    isMulti        : PropTypes.bool
};

CustomSelect.defaultProps = {
    label          : '',
    inputValue     : '',
    isShowError    : true,
    isSearchable   : false,
    isLoading      : false,
    selectedOption : {},
    error          : '',
    mode           : 'secondary',
    onInputChange  : () => {},
    isMulti        : false
};

export default React.memo(CustomSelect);
