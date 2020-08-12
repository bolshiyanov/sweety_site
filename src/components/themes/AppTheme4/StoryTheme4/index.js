import React from 'react';
import PropTypes from 'prop-types';
import { select } from 'redux-saga/effects';
import Button from 'components/common/Button';
import './index.scss';



const StoryTheme4 = ({
  title,
  onClick,
  selected,
}) => {
  const story = (
    <React.Fragment>
      {!selected && (
        <Button className="story-box-theme4"
          onClick={onClick}
        >
          <div className="story-picture-title-theme4">{title}</div>
        </Button >
      )}
      {selected && (
        <Button className="story-box-theme4-selected"
          onClick={onClick}
        >
          <div className="story-picture-title-theme4-selected">{title}</div>
        </Button >
      )}
    </React.Fragment>
  );
  return story;
}
StoryTheme4.propTypes = {
  title: PropTypes.string,
};
StoryTheme4.defaultProps = {
  title: '',
};

export default StoryTheme4; 