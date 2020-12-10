import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { trackWindowScroll, LazyLoadComponent } from 'react-lazy-load-image-component';
import { useCookies } from 'react-cookie';
import { uuid } from 'uuidv4';
import CatalogItem from 'components/themes/AppTheme7/CatalogTheme7';
import CatalogItemSettings from 'components/CatalogItems/CatalogItemSettings';
import Slider from 'components/common/Slider';
import {__} from 'utils/translation';
import { SCROLL_CATALOG_ID } from 'constants/scrolls';

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

const CatalogItemsTheme7 = ({ data, profile, scrollPosition }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [catalogItemData, setCatalogItemData] = useState(emptySettings);
  const [cookies] = useCookies();
  const { active } = useSelector((state) => state.config.account);

  const { catalogItems, stories } = useSelector((state) => state.config.data);
  const { storyGuid, headerGuid } = useSelector((state) => state.config);

  const closeCatalogItemsSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenCatalogItemSettings = (catalogItemId) => {
    setSettingsOpened(catalogItemId);
  };

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

  const hour = new Date().getHours();
  const checkCatalogItem = (e) => {
    return (storyGuid || (stories?.length ?? 0) === 0) 
      && (!storyGuid || !e.storyGuid || e.storyGuid === storyGuid) 
      && !e.outOfStock
      && ((!e.timeFrom && !e.timeTo) ||
        (e.timeFrom && e.timeTo && parseInt(e.timeFrom) <= hour && parseInt(e.timeTo) >= hour) ||
        (e.timeFrom && e.timeTo && parseInt(e.timeFrom) > parseInt(e.timeTo) && (parseInt(e.timeFrom) <= hour || parseInt(e.timeTo) <= hour)) ||
        (e.timeFrom && !e.timeTo && parseInt(e.timeFrom) <= hour) ||
        (!e.timeFrom && e.timeTo && parseInt(e.timeTo) >= hour))
      && (!e.headerGuid || e.headerGuid === headerGuid);
  }

  if (!inviteId && !active) { 
    return null;  
  }

  catalogItems.sort((a, b) => b.order - a.order);
  return (
    <React.Fragment>
      <div id={SCROLL_CATALOG_ID}>{
        data.filter(checkCatalogItem).map((catalogItem) =>
          <LazyLoadComponent key={catalogItem.guid} scrollPosition={scrollPosition} threshold={10}>
            <CatalogItem
              key={catalogItem.guid}
              {...catalogItem}
              scrollPosition={scrollPosition}
              onClick={catalogItem.price || catalogItem.number ? (() => onOpenCatalogItemSettings(catalogItem.guid)) : null}  />
          </LazyLoadComponent>)
      }</div>
      <div className="empty-catalogItems-box"></div>
      <Slider
        opened={settingsOpened}
        onClose={closeCatalogItemsSettings}
        onSubmit={closeCatalogItemsSettings}
        submitTitle={__("ЗАКРЫТЬ")?.toUpperCase()}
      >
        <CatalogItemSettings {...catalogItemData} />
      </Slider>
    </React.Fragment>
  );
};

CatalogItemsTheme7.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

CatalogItemsTheme7.defaultProps = {
  data: []
};

export default trackWindowScroll(CatalogItemsTheme7);
