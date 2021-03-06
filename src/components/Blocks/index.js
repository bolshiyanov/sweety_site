import React from 'react';
import PropTypes from 'prop-types';
import { trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';

import {__} from 'utils/translation';

import Block from './Block';
import './index.scss';

const Blocks = ({ data, referrerTitle, scrollPosition }) => {
  return (
    <React.Fragment>
      <div className="blocks">
        {referrerTitle && <div className="ad-label">{__("реклама от")} @{referrerTitle}</div>}
        {
          data.map((block) => 
          <LazyLoadComponent key={block.guid} scrollPosition={scrollPosition} threshold={10}>
            <Block key={block.guid} {...block} scrollPosition={scrollPosition} />
          </LazyLoadComponent>)
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

export default trackWindowScroll(Blocks);
