import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import './index.scss';

const Blocks = ({ data, referrerTitle }) => {
  return (
    <React.Fragment>
      <div className="blocks">
        {referrerTitle && <div className="ad-label">реклама от @{referrerTitle}</div>}
        {
          data.map((block) => <Block key={block.guid} {...block} />)
        }
      </div>
    </React.Fragment>
  );
};

Blocks.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  referrerTitle: PropTypes.string
};

Blocks.defaultProps = {
  data: [],
  referrerTitle: ''
};

export default Blocks;
