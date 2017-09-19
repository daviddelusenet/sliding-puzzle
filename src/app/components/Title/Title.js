import React from 'react';
import './Title.scss';

const Title = (props) => {
  return(
    <h1 styleName="Title">{props.text}</h1>
  );
};

export default Title;
