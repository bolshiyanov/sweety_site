import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
const Block = React.lazy(() => import('./Block'));


const Blocks = ({ data, referrerTitle }) => {
  return (
    <React.Fragment>
      <div className="blocks">
       <Suspense fallback={<div>Загрузка...</div>}>
        {referrerTitle && <div className="ad-label">реклама от @{referrerTitle}</div>}
        {
          data.map((block) => <Block key={block.guid} {...block} />)
        }
        </Suspense>
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
