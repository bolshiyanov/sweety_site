
import React from 'react';
import PropTypes from 'prop-types';
import { trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';

import CatalogItem from './CatalogItem';
import './index.scss';

const CatalogItems = ({ data, referrerTitle, scrollPosition }) => {
  return (
    <React.Fragment>
      
        {
          data.map((catalogItem) => 
          <LazyLoadComponent key={catalogItem.guid} scrollPosition={scrollPosition} threshold={10}>
            <CatalogItem key={catalogItem.guid} {...catalogItem} scrollPosition={scrollPosition} />
          </LazyLoadComponent>)
        }
      
    </React.Fragment>
  );
};

CatalogItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

CatalogItems.defaultProps = {
  data: []
};

export default CatalogItems;
