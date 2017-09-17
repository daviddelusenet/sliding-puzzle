// Import React stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Import shared styles
import './styles/global/global.scss';

// Import application
import App from './app/App';

const render = (App) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#SlidingPuzzle')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app/App', () => {
    render(App)
  });
}
