import React from 'react';
import {Provider} from 'react-redux';
import App from '../containers/App';
import {Store} from 'redux';
import {BrowserRouter} from 'react-router-dom';

interface IProps {
  store: Store;
}

const Root = ({store}: IProps) => (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

export default Root;