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
  CATALOG_HEADER,
} from 'constants/catalogTypes';

import { CATALOG_ORDER, CATALOG_PLAY, CATALOG_NEXT, CATALOG_PAUSE, CATALOG_FILTER_HEADER } from 'constants/actions';
import { parse } from 'superagent';
import { translatedProperty } from 'utils/translation';

const CatalogItem = ({
  guid,
  animation,
  image,
  audio,
  price,
  currency,
  number,
  outOfStock,
  type,
  text,
  textEn,
  textRu,
  textEs,
  textIt,
  textDe,
  textFr,
  textAlt,
  textAltEn,
  textAltRu,
  textAltEs,
  textAltIt,
  textAltDe,
  textAltFr,
  onClick,
  className,
  technical,
  playlist
}) => {
  const dispatch = useDispatch();
  const { count, sum } = useSelector((state) => state.config.order[guid] ?? { count: 0, sum: 0 });
  const { playingGuid, headerGuid } = useSelector((state) => state.config);

  const [audioError, setAudioError] = useState(false);
  const [seek, setSeek] = useState(false);
  const [seekInterval, setSeekInterval] = useState(null);
  const [autoplay, setAutoplay] = useState(false); 

  const translatedText = playlist && !audio ? "" :
    translatedProperty({ text, textEn, textEs, textRu, textDe, textFr, textIt }, "text");
  const [playingText, setPlayingText] = useState(translatedText);
  const translatedTextAlt = translatedProperty({ textAlt, textAltEn, textAltEs, textAltRu, textAltDe, textAltFr, textAltIt }, "textAlt");
  const [playingTextAlt, setPlayingTextAlt] = useState(translatedTextAlt);

  const isAudioPlayer = audio || playlist;

  const handleHeaderClick = () => {
    dispatch({ type: CATALOG_FILTER_HEADER, headerGuid: headerGuid === guid ? null : guid });
  }

  let [play, { stop, isPlaying, duration, sound }] = useSound(audio && audio.startsWith("https://sweety.link/") ? null : audio, {
    autoUnlock: true,
    format: "mpeg",
    preload: true,
    html5: true,
    onend: () => {
      setSeek(null);
      clearInterval(seekInterval);
      if (playlist) {
        dispatch({ type: CATALOG_NEXT, guid });
      }
    },
    onerror: () => {
      setAudioError(true);
    }
  });

  useEffect(() => {
    if (isPlaying && playingGuid !== guid) {
      handleStop();
      setAutoplay(false);
    } else if (!isPlaying && autoplay && audio && playingGuid === guid) {
      handlePlay();
    }
    if (playlist) {
      setPlayingText(text);
    }
  }, [playingGuid, sound, duration, audio]);

  /*useEffect(() => {
    if (playingAudio && sound && JSON.stringify(sound._src) !== JSON.stringify(playingAudio)) {
      sound.unload(true);
      sound._src = playingAudio;
      sound.load();
      if (autoplay) {
        handlePlay();
      }
    }
  }, [sound, playingAudio]);*/

  const pad = (num) => {
    var s = "0" + Math.round(num ?? 0);
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
      if (playlist) {
        setAutoplay(true);
      }
      handlePlay();
    } else {
      handleStop();
      if (playlist) {
        setAutoplay(false);
      }
    }
  }

  const handlePlay = (e) => {
    if (!isPlaying) {
      if (sound) {
        play();
        if (seek) {
          sound.seek(seek);
        }
        dispatch({ type: CATALOG_PLAY, guid });

        setSeekInterval(setInterval(() => {
          if (sound?.seek()) {
            setSeek(sound?.seek() ?? 0);
            setPlayingTextAlt((seek ?? 0) > 0 ? `${seekMin}:${seekSec} / ${durationMin}:${durationSec}` : translatedTextAlt);
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
          onClick={(e) => { isAudioPlayer ? handleAudioClick(e) : onClick() }}
        >
          {image && (price || number) && (
            <img src={image} alt={translatedText} />
          )}
          {(!price && !number) && playingText && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-left-title-without-button">{playingText}</div>
            </div>
          )}
          {(playingText && !playingTextAlt) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem__title">{playingText}</div>
            </div>
          )}
          {(playingText && playingTextAlt) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem__title">{playingText}</div>
              <div className="catalogItem-text-en">{playingTextAlt}</div>
            </div>
          )}

          {(price || number) && !isAudioPlayer && (
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

          {isAudioPlayer && (
            <Button isInline noStyled ><Icon type={audioError ? "cross" : !(!!sound && duration) ? "sync" : !isPlaying ? "play" : "pause"} className="catalogItem-sound-button" /> </Button>


          )}
        </div>
      );

      if (price || number || isAudioPlayer)
        return (
          <div >
            <Button className="button-in-catalogItem-left " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }

    case CATALOG_HEADER: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__center',
            { 'catalogItem__center__with-image': image },
            { 'catalogItem__center__with-image__without-button': (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (!price & !number) },
            { 'catalogItem-withimage-wihout-title': image && (!price & !number & !translatedText) },
            className
          ])}
          style={style}
          key={guid}
          onClick={handleHeaderClick}
        >
          <div className="catalogItem__title">{translatedText}<br/><Icon type={headerGuid ? "angleDoubleUp" : "angleDoubleDown"}/></div>
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
            { 'catalogItem-withimage-wihout-title': image && (!price & !number & !translatedText) },
            className
          ])}
          style={style}
          key={guid}
          onClick={(e) => { isAudioPlayer ? handleAudioClick(e) : onClick() }}
        >
          <div> {count > 0 && <div className="catalogItem-number-item">{count}</div>} </div>
          <div className="catalogItem__title">{translatedText}
            {(price || number) && !isAudioPlayer && (

              <div className="catalogItem-preorder-flex-column-center">
                {price && <div className="catalogItem-price-currency">{sumValue}&nbsp;{currency}</div>}
                {!price && <div className="catalogItem-price-empty"></div>}
              </div>

            )}

            {isAudioPlayer && (
              <div className="catalogItem-preorder-flex-column-center">
                <div className="catalogItem-preorder-flex-row">
                  <Button className="catalogItem-add-sound-center-button" >
                    <Icon type={audioError ? "cross" : !(!!sound && duration) ? "sync" : !isPlaying ? "play" : "pause"} className="catalogItem-add-sound-center" />
                    {audioError ? "CROSS" : !(!!sound && duration) ? "SYNC" : !isPlaying ? "PLAY" : "PAUSE"}</Button>
                </div>
                <div className="catalogItem-price-empty"></div>
              </div>
            )}
          </div>
        </div>
      );

      if (price || number || isAudioPlayer)
        return (
          <div >
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
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
          onClick={(e) => { isAudioPlayer ? handleAudioClick(e) : onClick() }}
        >
          {image && (price || number) && (
            <img src={image} alt={translatedText} />
          )}
          {(!price && !number) && playingText && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-right-title-without-button">{playingText}</div>
            </div>
          )}
          {(translatedText) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{translatedText}</div>
              {translatedTextAlt && <div className="catalogItem-text-en">{translatedTextAlt}</div>}
            </div>
          )}

          {(price || number) && price && !isAudioPlayer && (
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
          {(price || number) && !price && !isAudioPlayer && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={handlePlus} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>

            </div>
          )}

          {isAudioPlayer && (
            <Button ><Icon type={audioError ? "cross" : !(!!sound && duration) ? "sync" : !isPlaying ? "play" : "pause"} /> </Button>


          )}

        </div>

      );

      if (price || number || isAudioPlayer)
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
  audio: PropTypes.string,
  playlist: PropTypes.array,
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
