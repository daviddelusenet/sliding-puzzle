import React    from 'react';
import update from 'immutability-helper';
import './App.scss';

// Import components
import Canvas   from 'Canvas/Canvas';
import Tile     from 'Tile/Tile';
import Title    from 'Title/Title';

class App extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.shuffleTilePositions = this.shuffleTilePositions.bind(this);
    this.checkIfSolved = this.checkIfSolved.bind(this);
    this.updateTilePosition = this.updateTilePosition.bind(this);

    // Set initial state
    this.state = {
      tiles: [{
        "id": 1,
        "position": 1
      }, {
        "id": 2,
        "position": 2
      }, {
        "id": 3,
        "position": 3
      }, {
        "id": 4,
        "position": 4
      }, {
        "id": 5,
        "position": 5
      }, {
        "id": 6,
        "position": 6
      }, {
        "id": 7,
        "position": 7
      }, {
        "id": 8,
        "position": 8
      }, {
        "id": 9,
        "position": 9
      }, {
        "id": 10,
        "position": 10
      }, {
        "id": 11,
        "position": 11
      }, {
        "id": 12,
        "position": 12
      }, {
        "id": 13,
        "position": 13
      }, {
        "id": 14,
        "position": 14
      }, {
        "id": 15,
        "position": 15
      }],
      openPosition: 16,
      solved: true
    };
  }

  shuffleTilePositions() {
    const Positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const Tiles = [];
    let id = 1;
    let openPosition = 0;

    while (Positions.length) {
      let index = Math.floor(Math.random() * Positions.length);

      if (Positions.length > 1) {
        Tiles.push({
          "id": id,
          "position": Positions[index]
        });
      } else {
        openPosition = Positions[index];
      }

      Positions.splice(index, 1);
      id++;
    }

    this.setState(() => {
      return {
        tiles: Tiles,
        openPosition: openPosition,
        solved: false
      }
    });
  }

  updateTilePosition(id) {
    let i = 0;
    let oldOpenPosition = this.state.openPosition;
    let newOpenPosition = 0;

    for (let tile of this.state.tiles) {
      if (tile.id == id) {
        newOpenPosition = tile.position;
        break;
      }
      i++;
    }

    this.setState(update(this.state, {
      tiles: {
        $splice: [[i, 1, {"id": id, "position": oldOpenPosition}]]
      },
      openPosition: {
        $set: newOpenPosition
      }
    }));
  }

  checkIfSolved() {
    for (let tile of this.state.tiles) {
      if (tile.id != tile.position) {
        console.log('not solved');
        return false;
      }
    }

    console.log('solved');
    return true;
  }

  render() {
    const Tiles = this.state.tiles.map((data) => {
      return <Tile key={data.id} {...data} {...this.state} updateTilePosition={this.updateTilePosition} />;
    });

    return(
      <div styleName="SlidingPuzzle">
        <Title text="Sliding Puzzle" />
        <div styleName="SlidingPuzzle__canvas">
          {Tiles}
        </div>
        <button onClick={this.shuffleTilePositions}>Shuffle</button>
        <button onClick={this.checkIfSolved}>Solved?</button>
      </div>
    );
  }

}

export default App;
