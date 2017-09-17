import React        from 'react';
import ClassNames   from 'classnames';
import Styles       from './Tile.scss';

// Import animation libraries
import ScrollMagic  from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

class Tile extends React.Component {

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
    const TileClasses = ClassNames({
      [Styles['Tile']]: true,
      [Styles[`Tile--${this.props.id}`]]: this.props.id,
      [Styles[`Tile--position-${this.props.id}`]]: this.props.id
    });


    return(
      <div className={TileClasses} ref={div => this.el = div}></div>
    );
  }

}

export default Tile;
