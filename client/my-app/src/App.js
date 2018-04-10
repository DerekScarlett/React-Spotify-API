import React, { Component } from 'react';
import './App.css';

import Playing from './nowPlaying/nowPlaying.js';


import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {


  render() {
    return (
      <div>
             <Playing></Playing>
            
      </div>
    );
  }
}

export default App;
