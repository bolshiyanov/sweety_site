import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

import {
  CATALOG_LEFT,
  CATALOG_CENTER,
  CATALOG_RIGHT,
} from 'constants/catalogTypes';

import { CATALOG_ORDER } from 'constants/actions';
import { parse } from 'superagent';

const CatalogItem = ({
  guid,
  animation,
  image,
  text,
  textEn,
  price,
  currency,
  number,
  outOfStock,
  type,
  onClick,
  className,
  technical
}) => {
  const dispatch = useDispatch();
  const { count, sum } = useSelector((state) => state.config.order[guid] ?? { count: 0, sum: 0 });

  const handlePlus = (e) => {
    e.stopPropagation();
    dispatch({ type: CATALOG_ORDER, guid, count: count + 1, 
      sum: sum + parseFloat(price), currency });
  }

  const handleMinus = (e) => {
    e.stopPropagation();
    dispatch({ type: CATALOG_ORDER, guid, count: count - 1, 
      sum: sum - parseFloat(price), currency });
  }

  switch (type) {

    case CATALOG_LEFT:
    default: {
      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__left',
            { 'catalogItem__left__with-image': image },
            { 'catalogItem__left__with-button': (price || number) },
            { 'catalogItem__left__with-image__with-button': image && (price || number) },
            className
          ])}
          onClick={onClick}
        >
          {image && (price || number) && (
            <img src={image} alt={text} />
          )}
          {(!price && !number) && text && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-left-title-without-button">{text}</div>
            </div>
          )}
          {(text && !textEn) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{text}</div>
            </div>
          )}
          {(text && textEn) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem__title">{text}</div>
              <div className="catalogItem-text-en">{textEn}</div>
            </div>
          )}
          
          {(price || number) && price && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={handleMinus} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                <div className="catalogItem-quantity">{count}</div>
                <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>
              <div className="catalogItem-price-currency">{price}&nbsp;{currency}</div>
            </div>
          )}
          {(price || number) && !price && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={handleMinus} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                <div className="catalogItem-quantity">{count}</div>
                <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>
              <div className="catalogItem-price-empty"></div>
            </div>
          )}

        </div>

      );

      if ((price || number) && outOfStock)
        return (
          <div >
            <div className="catalogItem-number-item"><Icon type="lock" /></div>
            <Button className="button-in-catalogItem-left " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      if (price || number)
        return (
          <div >
            {number && <div className="catalogItem-number-item">{number}</div>}
            <Button className="button-in-catalogItem-left " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }


    case CATALOG_CENTER: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__center',
            { 'catalogItem__center__with-image': image },
            { 'catalogItem__center__with-button': (price || number) },
            { 'catalogItem__center__with-image__with-button': image && (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (!price & !number) },
            { 'catalogItem-withimage-wihout-title': image && (!price & !number & !text) },
            className
          ])}
          style={style}
          onClick={onClick}
        >
          <div className="catalogItem__title">{text}
            {(price || number) && price && (
              <div className="catalogItem-preorder-flex-column-center">
                <div className="catalogItem-preorder-flex-row">
                  <Button isInline noStyled onClick={handleMinus} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                  <div className="catalogItem-quantity">{count}</div>
                  <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
                </div>
                <div className="catalogItem-price-currency">{price}&nbsp;{currency}</div>
              </div>
            )}
            {(price || number) && !price && (
              <div className="catalogItem-preorder-flex-column-center">
                <div className="catalogItem-preorder-flex-row">
                  <Button isInline noStyled onClick={handleMinus} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                  <div className="catalogItem-quantity">{count}</div>
                  <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
                </div>
                <div className="catalogItem-price-empty"></div>
              </div>
            )}
          </div>
        </div>
      );
      if ((price || number) && outOfStock)
        return (
          <div >
            <div className="catalogItem-number-item"><Icon type="lock" /></div>
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );

      if (price || number)
        return (
          <div >
            {number && <div className="catalogItem-number-item">{number}</div>}
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }

    case CATALOG_RIGHT: {
      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__right',
            { 'catalogItem__right__with-image': image },
            { 'catalogItem__right__with-button': (price || number) },
            { 'catalogItem__right__with-image__with-button': image && (price || number) },
            className
          ])}
          onClick={onClick}
        >
          {image && (price || number) && (
            <img src={image} alt={text} />
          )}
          {(!price && !number) && text && (
            <div className="catalogItem-right-title-without-button">{text}</div>
          )}
          {(text && textEn) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{text}</div>
              <div className="catalogItem-text-en">{textEn}</div>
            </div>
          )}
          {(text && !textEn) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{text}</div>
            </div>
          )}

          {(price || number) && price && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                {count > 0 && <React.Fragment>
                  <Button isInline noStyled onClick={handleMinus} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                  <div className="catalogItem-quantity">{count}</div>x&nbsp;
                  <div className="catalogItem-price-currency-right">{price}&nbsp;{currency}</div>
                  <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
                </React.Fragment>}

                {count === 0 && <React.Fragment>
                  <div className="catalogItem-price-currency-right">{price}&nbsp;{currency}</div>
                  <Button isInline noStyled onClick={handlePlus} >
                    { number ?
                      <Icon type="plusCircle" className="catalogItem-add-button" />
                      : <Icon type="check" className="catalogItem-check-button" />
                    }
                  </Button>
                </React.Fragment>}
              </div>

            </div>
          )}
          {(price || number) && !price && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>

            </div>
          )}

        </div>

      );

      if ((price || number) && outOfStock)
        return (
          <div >
            <div className="catalogItem-number-item"><Icon type="lock" /></div>
            <Button className="button-in-catalogItem-right " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      if (price || number)
        return (
          <div >
            {number && <div className="catalogItem-number-item">{number}</div>}
            <Button className="button-in-catalogItem-right " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }




  }
};

CatalogItem.propTypes = {
  guid: PropTypes.string,
  animation: PropTypes.bool,
  image: PropTypes.string,
  text: PropTypes.string,
  textEn: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
  number: PropTypes.number,
  outOfStock: PropTypes.bool,
  type: PropTypes.string,
  technical: PropTypes.bool
};

CatalogItem.defaultProps = {
  animation: false,
  image: undefined,
  text: '',
  textEn: '',
  price: undefined,
  currency: '',
  number: undefined,
  outOfStock: false,
  type: undefined,
  technical: false
};

export default CatalogItem;
