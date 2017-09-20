import React        from 'react';
import ClassNames   from 'classnames';
import Styles       from './Tile.scss';

class Tile extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.moveTile = this.moveTile.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !(this.props.position === nextProps.position && this.props.amountOfTiles === nextProps.amountOfTiles);
  }

  moveTile() {
    const RowLength = Math.sqrt(this.props.amountOfTiles);

    if (this.props.openPosition === this.props.position - 1
      || this.props.openPosition === this.props.position + 1
      || this.props.openPosition === this.props.position - RowLength
      || this.props.openPosition === this.props.position + RowLength) {
      this.props.updateTilePosition(this.props.id);
    }
  }

  render() {
    const TileClasses = ClassNames({
      [Styles['Tile']]: true,
      [Styles[`Tile--${this.props.amountOfTiles}`]]: this.props.amountOfTiles,
      [Styles[`Tile--${this.props.amountOfTiles}-${this.props.id}`]]: this.props.id,
      [Styles[`Tile--position-${this.props.amountOfTiles}-${this.props.position}`]]: this.props.position
    });

    return(
      <div className={TileClasses} ref={div => this.el = div} onClick={this.moveTile}></div>
    );
  }

}

export default Tile;
