import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import InputGroup from './InputGroup';

import './index.scss';

const Input = ({
  className,
  value,
  placeholder,
  onChange,
  onClick,
  type,
  min,
  max,
  icon
}) => {
  const inputClassName = classnames(['input', className]);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
  }

  let iconComponent = null;
  if (icon) {
    iconComponent = (
      <div className="input__icon">
        <Icon type={icon} />
      </div>
    );

    if (type === 'file') {
      const onClickHandler = onClick || (() => inputRef.current.click());
      iconComponent = (
        <Button
          isInline
          noStyled
          className={classnames(['input', 'input__file', className])}
          onClick={onClickHandler}
        >
          <Icon type={icon} />
          <input
            ref={inputRef}
            type="file"
            className="input__hidden"
            value={value}
            onClick={handleClick}
            onChange={(e) => e.target.files.length && onChange(e.target.files, e)}
          />
        </Button>
      );
    }
  }

  if (icon) {
    return (
      <InputGroup className={className}>
        {iconComponent}
        {type !== 'file' && (
          <input
            type={type}
            min={min}
            max={max}
            placeholder={placeholder}
            className="input input__grouped"
            value={value}
            onClick={handleClick}
            onChange={(e) => onChange(e.target.value, e)}
          />)}
      </InputGroup>
    );
  }

  return (
    <input
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      className={inputClassName}
      value={value}
      onClick={handleClick}
      onChange={(e) => onChange(e.target.value, e)}
    />);
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func
};

Input.defaultProps = {
  className: undefined,
  value: '',
  placeholder: '',
  onChange: () => {},
  type: 'text',
  icon: undefined,
  onClick: undefined
};

export default Input;
