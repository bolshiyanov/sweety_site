import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';

import './index.scss';

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
            {onClose && (
              <Button className="slider__header__submit" onClick={onClose} isInline noStyled>
                <Icon type="checkCircle" noStyled />
              </Button>
            )}
          </div>
          <div className="slider__body">
            {children}
            {onSubmit && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit" onClick={onSubmit} isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
            {sms && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit"
                  onClick={() => window.open(`sms:${hasPhone}` + `&body=
                  ${sms}`, '_self')}
                  isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
            <div>{sms}</div>
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
  sms: '',
  hasPhone: '',
  children: null
};

export default Slider;
