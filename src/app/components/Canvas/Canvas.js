import React from 'react';
import './Canvas.scss';

// Import animation libraries
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div styleName="Canvas" ref={div => this.el = div}>
        {this.props.children}
      </div>
    );
  }

}

export default Canvas;
