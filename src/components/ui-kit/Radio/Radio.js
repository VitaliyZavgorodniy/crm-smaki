import { orange } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import PropTypes from 'prop-types';
import React from 'react';

const CONFIG = {
    color           : orange[800],
    '&.Mui-checked' : {
        color : orange[600]
    }
};

function CustomRadio({
    label,
    direction,
    items,
    value,
    defaultValue,
    valueKey,
    className,
    onChange
}) {
    const renderButtons = () => {
        return items.map(el => {
            return (
                <FormControlLabel
                    key={el.value}
                    value={el.value}
                    label={el.label}
                    control={<Radio sx={CONFIG} />}
                />
            );
        });
    };

    const handleChange = e => {
        // eslint-disable-next-line no-shadow
        const { value } = e.target;
        const item = items.find(el => el.value === value);

        onChange({ value: item, valueKey });
    };

    return (
        <FormControl
            component='fieldset'
            className={className}
        >
            <p style={{ fontSize: 14 }}>{label}</p>

            <RadioGroup
                aria-label={label}
                name='radio-buttons-group'
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                {...direction === 'row' && { row: true }}
            >
                {renderButtons()}
            </RadioGroup>
        </FormControl>
    );
}

CustomRadio.propTypes = {
    items        : PropTypes.array.isRequired,
    label        : PropTypes.string,
    direction    : PropTypes.oneOf([ 'row', 'column' ]),
    value        : PropTypes.string,
    defaultValue : PropTypes.string,
    valueKey     : PropTypes.string.isRequired,
    onChange     : PropTypes.func.isRequired,
    className    : PropTypes.string
};

CustomRadio.defaultProps = {
    label        : '',
    direction    : 'row',
    value        : '',
    defaultValue : '',
    className    : ''
};

export default React.memo(CustomRadio);
