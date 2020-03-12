import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Block from './Block';

import './index.scss';

const Blocks = ({ data }) => {
  const { blocks } = useSelector((state) => state.config.data);

  blocks.sort((a, b) => b.order - a.order);
  return (
    <React.Fragment>
      <div className="blocks">
        {
          data.map((block) => <Block key={block.guid} {...block} />)
        }
      </div>
    </React.Fragment>
  );
};

Blocks.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

Blocks.defaultProps = {
  data: []
};

export default Blocks;
