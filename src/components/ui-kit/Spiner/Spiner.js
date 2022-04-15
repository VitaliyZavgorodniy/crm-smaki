import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';

import styles from './Spiner.module.scss';

function Spiner({ width, height, className, color }) {
    const COLORS = {
        white  : '#FFFFFF',
        orange : '#EDA240'
    };

    return (
        <div className={`${styles.loaderWrapper} ${className}`}>
            <Loader
                type='Oval'
                color={COLORS[color]}
                width={width}
                height={height}
            />
        </div>
    );
}

Spiner.propTypes = {
    width     : PropTypes.number,
    height    : PropTypes.number,
    color     : PropTypes.oneOf([ 'white', 'orange' ]),
    className : PropTypes.string
};

Spiner.defaultProps = {
    width     : 30,
    height    : 30,
    color     : 'white',
    className : ''
};

export default Spiner;
