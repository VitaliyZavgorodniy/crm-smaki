/*  no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';

import styles from './NavigationTabs.module.scss';

function NavigationTabs({ tabs, activeTabIndex, tabMode, disabledTabs, onTabClick }) {
    const handleTabClick = (tab, index) => () => {
        if (!disabledTabs.includes(index)) {
            onTabClick({ tab, index });
        }
    };

    const renderTab = (tab, index) => {
        const { title, key } = tab;
        const isTabDisabled = disabledTabs.includes(index);
        const isTabActive = index === activeTabIndex;
        const tabClassName = isTabDisabled
            ? `${styles.tabs__tab} ${styles.tabs__tab_disabled}`
            : isTabActive
                ? `${styles.tabs__tab} ${styles.tabs__tab_active}`
                : styles.tabs__tab;

        return (
            <div
                key={key}
                className={`${tabClassName} font-500 ${styles[tabMode]}`}
                onClick={handleTabClick(tab, index)}
            >
                <span className={styles.tabs__tab__title}>
                    {title}
                </span>
            </div>
        );
    };

    return (
        <div className={styles.tabs}>
            {tabs.map(renderTab)}
        </div>
    );
}

export default React.memo(NavigationTabs);

NavigationTabs.propTypes = {
    tabs           : PropTypes.array.isRequired,
    activeTabIndex : PropTypes.number.isRequired,
    disabledTabs   : PropTypes.array,
    onTabClick     : PropTypes.func.isRequired,
    tabMode        : PropTypes.oneOf([ 'dark', 'light' ])
};

NavigationTabs.defaultProps = {
    disabledTabs : [],
    tabMode      : 'dark'
};
