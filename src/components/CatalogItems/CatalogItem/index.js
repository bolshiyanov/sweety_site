import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Input from 'components/common/Input';
import API from 'utils/api';

import './index.scss';

import {
  CATALOG_LEFT,
  CATALOG_CENTER,
  CATALOG_RIGHT,
} from 'constants/catalogTypes';

import { CATALOG_ORDER, CATALOG_PLAY, CATALOG_PLAYED, CATALOG_PAUSE } from 'constants/actions';
import { parse } from 'superagent';
import { translatedProperty } from 'utils/translation';

const CatalogItem = (props) => {
  const {
    guid,
    animation,
    image,
    audio,
    price,
    currency,
    number,
    outOfStock,
    type,
    onClick,
    className,
    technical
  } = props;
  const dispatch = useDispatch();
  const { count, sum } = useSelector((state) => state.config.order[guid] ?? { count: 0, sum: 0 });
  const { playingGuid } = useSelector((state) => state.config);
  const text = translatedProperty(props, "text");
  const textAlt = translatedProperty(props, "textAlt");
  const [ audioError, setAudioError ] = useState(false);
  const [ seek, setSeek ] = useState(false);
  const [ seekInterval, setSeekInterval ] = useState(null);

  let [play, { stop, isPlaying, duration, sound }] = useSound(audio?.startsWith("http") ? null : audio, {
    autoUnlock: true,
    onend: () => {
      setSeek(null);
      clearInterval(seekInterval);
      if (duration < 30 * 60 * 1000) {
        dispatch({ type: CATALOG_PLAYED, guid });
      }
    }, 
    onerror: () => {
      setAudioError(true);
    } 
  });

  useEffect(() => {
    if (isPlaying && playingGuid !== guid) {
      handleStop();
    } else if (!isPlaying && sound && duration && playingGuid === guid) {
      handlePlay();
    }
  }, [playingGuid, sound, duration]);

   const pad = (num) => {
    var s = "0" + Math.round(num);
    return s.substr(s.length - 2);
  }

  const durationMin = pad(duration / 1000 / 60);
  const durationSec = pad(duration / 1000 % 60);
  const seekMin = pad(seek / 60);
  const seekSec = pad(seek % 60);

  const handlePlus = (e) => {
    e.stopPropagation();
    dispatch({
      type: CATALOG_ORDER, guid, count: count + 1,
      sum: sum + parseFloat(price), currency
    });
  }

  const handleMinus = (e) => {
    e.stopPropagation();
    if (count === 0) {
      return;
    }
    dispatch({
      type: CATALOG_ORDER, guid, count: count - 1,
      sum: sum - parseFloat(price), currency
    });
  }

  const handleSetCount = (value) => {
    dispatch({
      type: CATALOG_ORDER, guid, count: parseInt(value),
      sum: value * parseFloat(price), currency
    });
  }

  const handleChecked = (e) => {
    if (count === 0) {
      handlePlus(e);
    } else {
      handleMinus(e);
    }
  }

  const handleAudioClick = (e) => {
    e.stopPropagation();
    if (!isPlaying) {
      handlePlay();
    } else {
      handleStop();
    }
  }

  const handlePlay = (e) => {
    if (!isPlaying) {
      if (sound && duration) {
        play();
        if (seek) {
          sound.seek(seek);
        }
        dispatch({ type: CATALOG_PLAY, guid });

        setSeekInterval(setInterval(() => {
          if (sound?.seek()) {
            setSeek(sound?.seek() ?? 0);
          }
        }, 1000));
      }
    }
  }

  const handleStop = () => {
    if (isPlaying) {
      setSeek(sound.seek());
      stop();
    }
    clearInterval(seekInterval);
    dispatch({ type: CATALOG_PAUSE, guid });
  }

  const sumValue = count !== 0 ? sum.toFixed(2) :
    parseFloat(price).toFixed(2);

  switch (type) {
    case CATALOG_LEFT:
    default: {
      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__left',
            { 'catalogItem__left__with-image': image },
            { 'catalogItem__left__with-button': (price || number) },
            { 'catalogItem__left__with-image__with-button': image && (price || number) },
            className
          ])}
          key={guid}
          onClick={(e) => { audio ? handleAudioClick(e) : onClick() }}
        >
          {image && (price || number) && (
            <img src={image} alt={text} />
          )}
          {(!price && !number) && text && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-left-title-without-button">{text}</div>
            </div>
          )}
          {(text && !textAlt && !seek) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem__title">{(audio ? (sound?._src ? JSON.stringify(sound._src).substring(0, 15) : null) :null) ?? text}</div>
            </div>
          )}
          {(text && (textAlt || seek)) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem__title">{text}</div>
              <div className="catalogItem-text-en">{(seek ?? 0) > 0 ? `${seekMin}:${seekSec} / ${durationMin}:${durationSec}` : textAlt}</div>
            </div>
          )}

          {(price || number) && !audio && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={handleMinus} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                <div className="catalogItem-quantity">{count}</div>
                <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>
              {price && <div className="catalogItem-price-currency">{sumValue}&nbsp;{currency}</div>}
              {!price && <div className="catalogItem-price-empty"></div>}
            </div>
          )}

          {!!audio && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled ><Icon type={!(!!sound && duration) ? "sync" : !isPlaying || audioError ? "play" : "pause"} className="catalogItem-add-button" /> </Button>
              </div>
            </div>
          )}
        </div>
      );

      if (price || number || !!audio)
        return (
          <div >
            <Button className="button-in-catalogItem-left " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }

    case CATALOG_CENTER: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__center',
            { 'catalogItem__center__with-image': image },
            { 'catalogItem__center__with-button': (price || number) },
            { 'catalogItem__center__with-image__with-button': image && (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (!price & !number) },
            { 'catalogItem-withimage-wihout-title': image && (!price & !number & !text) },
            className
          ])}
          style={style}
          key={guid}
          onClick={onClick}
        >
          <div className="catalogItem__title">{text}
            {(price || number) && (
              <div className="catalogItem-preorder-flex-column-center">
                <div className="catalogItem-preorder-flex-row">
                  <Input
                    className="catalogItem-input"
                    value={count}
                    name="fieldInputCount"
                    type="number"
                    min={0}
                    onChange={(value) => handleSetCount(value)}
                  />
                </div>
                {price && <div className="catalogItem-price-currency">{sumValue}&nbsp;{currency}</div>}
                {!price && <div className="catalogItem-price-empty"></div>}
              </div>
            )}
          </div>
        </div>
      );

      if (price || number)
        return (
          <div >
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }

    case CATALOG_RIGHT: {
      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__right',
            { 'catalogItem__right__with-image': image },
            { 'catalogItem__right__with-button': (price || number) },
            { 'catalogItem__right__with-image__with-button': image && (price || number) },
            className
          ])}
          key={guid}
          onClick={onClick}
        >
          {image && (price || number) && (
            <img src={image} alt={text} />
          )}
          {(!price && !number) && text && (
            <div className="catalogItem-right-title-without-button">{text}</div>
          )}
          {(text) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{text}</div>
              {textAlt && <div className="catalogItem-text-en">{textAlt}</div>}
            </div>
          )}

          {(price || number) && price && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                <div className="catalogItem-price-currency-right">{price}&nbsp;{currency}</div>
                <Button isInline noStyled onClick={handleChecked} >
                  {count === 0 ?
                    <Icon type="plusCircle" className="catalogItem-add-button" />
                    : <Icon type="check" className="catalogItem-check-button" />
                  }
                </Button>
              </div>

            </div>
          )}
          {(price || number) && !price && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>

            </div>
          )}

        </div>

      );

      if (price || number)
        return (
          <div >
            <Button className="button-in-catalogItem-right " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }
  }
};

CatalogItem.propTypes = {
  guid: PropTypes.string,
  animation: PropTypes.bool,
  image: PropTypes.string,
  text: PropTypes.string,
  textEn: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
  number: PropTypes.number,
  outOfStock: PropTypes.bool,
  type: PropTypes.string,
  technical: PropTypes.bool,
  refObj: PropTypes.object
};

CatalogItem.defaultProps = {
  animation: false,
  image: undefined,
  text: '',
  textEn: '',
  price: undefined,
  currency: '',
  number: undefined,
  outOfStock: false,
  type: undefined,
  technical: false,
  refObj: undefined
};

export default CatalogItem;
