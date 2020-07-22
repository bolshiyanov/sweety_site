import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'components/common/Button';
import './index.scss';



const StoryTheme4 = ({
  title,
  onClick,
}) => {
  const story = (
    <Button className="story-box-theme4"
      onClick={onClick}
    >
      <div className="story-picture-title-theme4">{title}</div>
    </Button >
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