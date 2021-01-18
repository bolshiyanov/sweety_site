import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';

import './index.scss';
import { __ } from 'utils/translation';

const Slider = ({
  opened,
  onClose,
  onSubmit,
  onRemove,
  onSend,
  title,
  subtitle,
  submitTitle,
  sms,
  timer,
  hasPhone,
  children
}) => (

  
    <>
      {opened && <div className={classnames(['slider-container', { opened }])}>
        <div className="slider-background" onClick={onClose} />
        <div className="slider">
          <div className="slider__header">
            {onRemove && (
              <Button className="slider__header__remove" onClick={onRemove} isInline noStyled>
                <Icon type="trash" noStyled />
              </Button>
            )}
            <div className="slider__header__title">{title}</div>
            <div className="slider__header__subtitle">{subtitle}</div>
            {timer && (<div className="slider__header__timer">{timer}</div>)}
            {onClose && (
              <Button className="slider__header__submit" onClick={onClose} isInline noStyled>
                <Icon type="checkCircle" noStyled />
              </Button>
            )}
          </div>
          <div className="slider__body">
            {children}
            {onSubmit && submitTitle && !hasPhone && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit" onClick={onSubmit} isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
            {onSubmit && submitTitle && hasPhone && (
              <div className="slider-header-submitbody-submit">
                <div className="slider-header-submitbody-submit-box">
                <Button className="slider-header-submit-hasPhone" onClick={onSubmit} isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
                <br/>
                <Button className="slider-header-submit-hasPhone" onClick={() => window.open(hasPhone, "_blank")} isInline noStyled>
                  &nbsp;{__("Позвонить и проверить заказ")}
                </Button>
                </div>
              </div>
            )}
            {sms && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit"
                  onClick={() => window.open(`sms:${hasPhone}` + `&body=
                  ${(sms.toString())}`, '_self')}
                  isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>}
    </>);

Slider.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  title: PropTypes.string,
  timer: PropTypes.string,
  sms: PropTypes.string,
  hasPhone: PropTypes.string,
  children: PropTypes.node
};

Slider.defaultProps = {
  opened: false,
  onClose: () => { },
  onSubmit: undefined,
  onRemove: undefined,
  title: '',
  timer: '',
  sms: '',
  hasPhone: '',
  children: null
};

export default Slider;
