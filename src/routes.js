import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SongList from './components/song-list';
import SongDetail from './components/song-detail';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="songs/:id" component={SongDetail} />
    </Route>
);
