import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import './index.scss';

const Picker = ({ selected, items, className, itemClassName }) => (
  <div className={classnames(['picker__container', className])}>
    {
      items.map((item) => (
        <div
          className={classnames([itemClassName, { picker__item__selected: selected === item.id }])}
          key={item.id}
        >
          {item.component}
        </div>
      ))
    }
  </div>
);

Picker.propTypes = {
  selected: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    component: PropTypes.node
  })),
  className: PropTypes.string,
  itemClassName: PropTypes.string
};

Picker.defaultProps = {
  selected: null,
  items: [],
  className: undefined,
  itemClassName: 'picker__item'
};

export default Picker;
