import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import { __ } from 'utils/translation';

import './index.scss';

import { CATALOG_ORDER } from 'constants/actions';

const CatalogItemSettings = ({
    guid,
    image,
    text,
    description,
    textEn,
    descriptionEn,
    price,
    currency,
    number,
}) => {
    const dispatch = useDispatch();
    const { count, sum } = useSelector((state) => state.config.order[guid] ?? { count: 0, sum: 0 });
  
    const handlePlus = (e) => {
      e.stopPropagation();
      dispatch({
        type: CATALOG_ORDER, guid, count: count + 1,
        sum: sum + parseFloat(price), currency
      });
    }
  
    const handleMinus = (e) => {
      e.stopPropagation();
      if (count === 0) {
        return;
      }
      dispatch({
        type: CATALOG_ORDER, guid, count: count - 1,
        sum: sum - parseFloat(price), currency
      });
    }  

    return (
        <React.Fragment>
            <div className="catalogItem-slider">
                <div className="catalogItem-slider__title">{text}</div>
                <div className="catalogItem-slider__pic"><img src={image} alt={text} /></div>
                {price && (
                    <div className="catalogItem-slider__price">{__("Стоимость")}: {price} {currency}</div>
                )}

                <div className="catalogItem-order-box">
                    <Button className="catalogItem-order-botton" noStyled
                        onClick={handleMinus} >{__("Убрать")}</Button>
                    <div className="catalogItem-order-box-quantity">{count}</div>
                    <Button className="catalogItem-order-botton" noStyled
                        onClick={handlePlus} >{__("Добавить")}</Button>
                </div>
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
                    <div className="catalogItem-slider__number">{__("Артикул")}: {number}</div>
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

