import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { select } from 'redux-saga/effects';
import './index.scss';



const StoryTheme3 = ({
  title,
  onClick,
  selected,
}) => {

  const story = (
    <React.Fragment>
      {!selected && (
        <div className="story-box-theme3"
          onClick={onClick}
        >
          <div className="story-picture-title-theme3">{title}</div>
        </div >
      )}
      {selected && (
        <div className="story-box-theme3"
          onClick={onClick}
        >
          <div className="story-picture-title-theme3-selected">{title}</div>
        </div >
      )}
    </React.Fragment>
  );
  return story;
}
StoryTheme3.propTypes = {
  title: PropTypes.string,
};
StoryTheme3.defaultProps = {
  title: '',
};

export default StoryTheme3;