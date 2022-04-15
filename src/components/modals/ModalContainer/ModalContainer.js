import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import styles from './ModalContainer.module.scss';
import { MODALS_BY_NAME } from './modals';

class ModalContainer extends PureComponent {
    static propTypes = {
        modals : PropTypes.array.isRequired
    };

    getModalsList = () => {
        const { modals } = this.props;
        const modalsConfig = {
            ...MODALS_BY_NAME,
            ...modals
        };

        return modals
            .map(modalData => ({
                Component : modalsConfig[modalData.name],
                ...modalData
            }))
            .filter(modal => modal.Component);
    }

    renderModals = modalsList => {
        return (
            modalsList.map(({ Component, name, createdAt, props = {} }) => {
                return (
                    <Component
                        key={`${name}${createdAt}`}
                        {...props}
                    />
                );
            })
        );
    }

    render() {
        const modalsList = this.getModalsList();

        if (!modalsList.length) {
            return null;
        }

        return (
            <div className={styles.modalContainer}>
                {this.renderModals(modalsList)}
            </div>
        );
    }
}

export default ModalContainer;
