import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { ReactComponent as AddImage } from 'assets/icons/add_image.svg';
import { ReactComponent as BasketIcon } from 'assets/icons/basket.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as EditPenIcon } from 'assets/icons/edit_pen.svg';
import { ReactComponent as FingerTouch } from 'assets/icons/finger_touch.svg';
import { ReactComponent as Go } from 'assets/icons/go.svg';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as SearchIconLight } from 'assets/icons/search_light.svg';
import { ReactComponent as Smaki } from 'assets/icons/smaki.svg';
import { ReactComponent as Icon } from 'assets/icons/icon.svg';

import { ReactComponent as HomeIcon } from 'assets/icons/navigation_tabs/home.svg';

const SIDEBAR_ICONS = {
    logo : LogoIcon,
    home : HomeIcon
};

const SVG_BY_TYPE = {
    ...SIDEBAR_ICONS,
    search      : SearchIcon,
    searchLight : SearchIconLight,
    close       : CloseIcon,
    editPen     : EditPenIcon,
    smaki       : Smaki,
    icon        : Icon,
    go          : Go,
    fingerTouch : FingerTouch,
    addImage    : AddImage,
    basket      : BasketIcon
};


class SvgIcon extends PureComponent {
    static propTypes = {
        type      : PropTypes.string,
        className : PropTypes.string,
        onClick   : PropTypes.func,
        svg       : PropTypes.func
    }

    static defaultProps = {
        type      : '',
        className : '',
        onClick   : void 0,
        svg       : void 0
    }

    handleClick = e => {
        const { onClick } = this.props;

        if (onClick) {
            onClick(e);
        }
    }

    render() {
        const { type, className, svg } = this.props;

        const Svg = svg || SVG_BY_TYPE[type];

        if (!Svg) {
            return null;
        }

        return (
            <Svg
                onClick={this.handleClick}
                className={className}
            />
        );
    }
}

export default SvgIcon;
