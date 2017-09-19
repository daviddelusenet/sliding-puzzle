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

    // Bind functions
    this.moveTile = this.moveTile.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  moveTile() {
    if (this.props.openPosition == this.props.position - 1
      || this.props.openPosition == this.props.position + 1
      || this.props.openPosition == this.props.position - 4
      || this.props.openPosition == this.props.position + 4) {
      this.props.updateTilePosition(this.props.id);
    }
  }

  render() {
    const TileClasses = ClassNames({
      [Styles['Tile']]: true,
      [Styles[`Tile--${this.props.id}`]]: this.props.id,
      [Styles[`Tile--position-${this.props.position}`]]: this.props.position
    });

    return(
      <div className={TileClasses} ref={div => this.el = div} onClick={this.moveTile}></div>
    );
  }

}

export default Tile;
