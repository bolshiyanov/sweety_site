
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';
import { useCookies } from 'react-cookie';
import { uuid } from 'uuidv4';
import { useSelector } from 'react-redux';
import CatalogItem from './CatalogItem';
import CatalogItemSettings from './CatalogItemSettings';
import Slider from 'components/common/Slider';
import './index.scss';

const emptySettings = {
  guid: null,
  type: 'preview-text',
  text: '',
  description: '',
  image: '',
  textEn: '',
  descriptionEn: '',
};

const CatalogItems = ({ data, profile, scrollPosition }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [catalogItemData, setCatalogItemData] = useState(emptySettings);
  const [cookies] = useCookies();

  const closeCatalogItemsSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenCatalogItemSettings = (catalogItemId) => {
    setSettingsOpened(catalogItemId);
  };

  const { active } = useSelector((state) => state.config.account);

  const { catalogItems } = useSelector((state) => state.config.data);
  const { storyGuid } = useSelector((state) => state.config);

  var inviteId = cookies[profile];
  if (inviteId === "undefined") {
    inviteId = null;
  }

  useEffect(() => {
    const currentCatalogItem = catalogItems.find((catalogItem) => catalogItem.guid === settingsOpened);
    const settings = currentCatalogItem || { ...emptySettings };
    if (!settings.guid)
      settings.guid = uuid();
      setCatalogItemData({ ...settings });
  }, [settingsOpened, catalogItems]);

  // if (!inviteId && !active) { 
  //   return null;
  // }
  return (
    <React.Fragment>

      {
        data.filter(e => !storyGuid || e.storyGuid === storyGuid).map((catalogItem) =>
          <LazyLoadComponent key={catalogItem.guid} scrollPosition={scrollPosition} threshold={10}>
            <CatalogItem
              key={catalogItem.guid}
              {...catalogItem}
              scrollPosition={scrollPosition}
              onClick={() => onOpenCatalogItemSettings(catalogItem.guid)}  />
          </LazyLoadComponent>)
      }
      <Slider
        opened={settingsOpened}
        onClose={closeCatalogItemsSettings}
        onSubmit={closeCatalogItemsSettings}
      >
        <CatalogItemSettings {...catalogItemData} />
      </Slider>
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
