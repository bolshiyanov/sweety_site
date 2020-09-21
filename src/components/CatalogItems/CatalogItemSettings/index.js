import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {__} from 'utils/translation';

import './index.scss';

const CatalogItemSettings = (props) => {

    const {
        image,
        text,
        description,
        textEn,
        descriptionEn,
        price,
        currency,
        number,
    } = props;

    const space = "  ";

    return (
        <React.Fragment>
            <div className="catalogItem-slider">
                <div className="catalogItem-slider__title">{text}</div>
                <div className="catalogItem-slider__pic"><img src={image} alt={text} /></div>
                {price && (
                    <div className="catalogItem-slider__price">{__("Стоимость")}:{space}{price}{space}{currency}</div>
                )}
                {description && (
                    <div className="catalogItem-slider__description">{description}</div>
                )}
                {textEn && (
                    <div className="catalogItem-slider__title">{textEn}</div>
                )}
                {descriptionEn && (
                    <div className="catalogItem-slider__description">{descriptionEn}</div>
                )}
                {number && (
                    <div className="catalogItem-slider__number">{__("Артикул")}:{space}{number}</div>
                )}
            </div>
        </React.Fragment >
    );
};

CatalogItemSettings.propTypes = {
    image: PropTypes.string,
    text: PropTypes.string,
    description: PropTypes.string,
    textEn: PropTypes.string,
    descriptionEn: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string,
    number: PropTypes.number,

};

CatalogItemSettings.defaultProps = {
    image: '',
    text: '',
    description: '',
    textEn: '',
    descriptionEn: '',
    price: '',
    currency: '',
    number: ''

};

export default CatalogItemSettings;

