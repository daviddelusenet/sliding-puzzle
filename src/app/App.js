import React    from 'react';
import update   from 'immutability-helper';
import './App.scss';

// Import components
import Tile     from 'Tile/Tile';
import Title    from 'Title/Title';

class App extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions
    this.shuffleTilePositions = this.shuffleTilePositions.bind(this);
    this.checkIfSolved = this.checkIfSolved.bind(this);
    this.updateTilePosition = this.updateTilePosition.bind(this);
    this.changeAmountOfTiles = this.changeAmountOfTiles.bind(this);

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
      solved: true,
      amountOfTiles: 16,
      shuffled: false
    };
  }

  componentDidUpdate() {
    if (this.checkIfSolved() && !this.state.solved && this.state.shuffled) {
      this.setState(update(this.state, {
        solved: {
          $set: true
        },
        shuffled: {
          $set: false
        }
      }));

      console.info('You did it!');
    }
  }

  shuffleTilePositions() {
    const Positions = [];
    const Tiles = [];
    let id = 1;
    let openPosition = 0;

    for (let i = 1; i <= this.state.amountOfTiles; i++) {
      Positions.push(i);
    }

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
        solved: false,
        shuffled: true
      }
    });
  }

  updateTilePosition(id) {
    let i = 0;
    let oldOpenPosition = this.state.openPosition;
    let newOpenPosition = 0;

    for (let tile of this.state.tiles) {
      if (tile.id === id) {
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
      },
      solved: {
        $set: false
      }
    }));
  }

  changeAmountOfTiles() {
    const NewState = {
      tiles: [],
      openPosition: parseInt(this.amountOfTiles.value),
      solved: true,
      amountOfTiles: parseInt(this.amountOfTiles.value)
    };

    for (let i = 1; i < this.amountOfTiles.value; i++) {
      NewState.tiles.push({
        "id": i,
        "position": i
      })
    }

    this.setState(() => {
      return NewState;
    });
  }

  checkIfSolved() {
    for (let tile of this.state.tiles) {
      if (tile.id != tile.position) {
        return false;
      }
    }

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
        <select defaultValue="16" onChange={this.changeAmountOfTiles} ref={select => this.amountOfTiles = select}>
          <option value="9">9</option>
          <option value="16">16</option>
          <option value="25">25</option>
        </select>
      </div>
    );
  }

}

export default App;
