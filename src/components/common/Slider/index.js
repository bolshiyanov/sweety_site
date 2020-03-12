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
  title,
  children
}) => (
  <div className={classnames(['slider-container', { opened }])}>
    <div className="slider-background" onClick={onClose} />
    <div className="slider">
      <div className="slider__header">
        {onRemove && (
          <Button className="slider__header__remove" onClick={onRemove} isInline noStyled>
            <Icon type="trash" noStyled />
          </Button>
        )}
        <div className="slider__header__title">{title}</div>
        {onSubmit && (
          <Button className="slider__header__submit" onClick={onSubmit} isInline noStyled>
            <Icon type="checkCircle" noStyled />
          </Button>
        )}
      </div>
      <div className="slider__body">
        {children}
      </div>
    </div>
  </div>
);

Slider.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node
};

Slider.defaultProps = {
  opened: false,
  onClose: () => {},
  onSubmit: undefined,
  onRemove: undefined,
  title: '',
  children: null
};

export default Slider;
