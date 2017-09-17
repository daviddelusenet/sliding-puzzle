import React from 'react';
import update from 'immutability-helper';

// Import components
import Canvas   from 'Canvas/Canvas';
import Tile     from 'Tile/Tile';

class App extends React.Component {

  constructor(props) {
    super(props);

    // Bind functions

    this.state = {
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    };

    this.amountOfTiles = 16;
  }


  render() {
    const Tiles = this.state.tiles.map((id) => {
      return <Tile key={id} id={id} />;
    });

    return(
      <Canvas>
        {Tiles}
      </Canvas>
    );
  }

}

export default App;
