import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/app';

import './css/index.scss';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (typeof (module.hot) !== 'undefined') {
  module.hot.accept();
}
