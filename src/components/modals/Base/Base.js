/*  react/no-array-index-key */
/*  no-nested-ternary */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './Base.module.scss';

class Base extends PureComponent {
    static propTypes = {
        closeAllModals    : PropTypes.func.isRequired,
        removeActiveOrder : PropTypes.func.isRequired,
        onClose           : PropTypes.func,
        isFirstModal      : PropTypes.bool,
        isLastModal       : PropTypes.bool,
        configuration     : PropTypes.shape({
            name     : PropTypes.string,
            title    : PropTypes.string,
            fields   : PropTypes.array.isRequired,
            controls : PropTypes.shape({
                cancel : PropTypes.shape({
                    title : PropTypes.string.isRequired
                }),
                submit : PropTypes.shape({
                    title : PropTypes.string.isRequired
                }).isRequired
            })
        }).isRequired
    };

    static defaultProps = {
        onClose      : () => {},
        isFirstModal : true,
        isLastModal  : true
    };

    constructor(props) {
        super(props);

        this.state = {
            className : styles.base
        };
    }

    componentDidMount() {
        const { isFirstModal, isLastModal } = this.props;
        const className = isFirstModal
            ? `${styles.base_active} ${styles.base_first}`
            : isLastModal
                ? `${styles.base_active} ${styles.base_last}`
                : styles.base_active;

        setTimeout(() => {
            this.updateBaseClassName(className);
        }, 0);
    }

    handleCloseAllModals = () => {
        const { closeAllModals, removeActiveOrder, onClose } = this.props;

        closeAllModals();
        removeActiveOrder();
        onClose();
    }

    updateBaseClassName = className => {
        this.setState(() => {
            return { className };
        });
    }

    renderFields = () => {
        const { configuration: { fields } } = this.props;

        return fields.map((el, index) => {
            const { renderCustomField } = el;

            return (
                <div
                    key={index}
                    className={styles.base__customField}
                >
                    {renderCustomField()}
                </div>
            );
        });
    }

    render() {
        const { className } = this.state;

        return (
            <>
                <div className={className}>
                    {this.renderFields()}
                </div>

                <div
                    className={styles.base__bg}
                    onClick={this.handleCloseAllModals}
                />
            </>
        );
    }
}

export default Base;
