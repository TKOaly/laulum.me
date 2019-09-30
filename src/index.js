import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';

import App from './components/app';
import SongList from './components/song-list';
import SongDetail from './components/song-detail';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
   <App>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SongList} />
          <Route path="/songs/:id" component={SongDetail} />
        </Switch>
      </BrowserRouter>
  </App>
  </Provider>
  , document.querySelector('.content'));