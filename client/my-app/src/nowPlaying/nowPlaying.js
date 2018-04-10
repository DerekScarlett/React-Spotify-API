import React, { Component } from 'react';
import './nowPlaying.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Playing extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        artist: '',
        device: ''
      }
    } //library stores the acces tken so that we dont have to request it each time
    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
   getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying(){
   spotifyWebApi.getMyCurrentPlaybackState()
   .then((response) => {
     console.log(response);
    console.log(response.item.album.artists[0].name)
     this.setState({
       nowPlaying: {
         name: response.item.name,
         image: response.item.album.images[0].url,
         artist: response.item.album.artists[0].name,
         device: response.device.name,
         album: response.item.external_urls.spotify,
          demo: response.item.external_urls.preview_url

       }
     })
   })
  }
  render() {
    return (
      <div className="App">

      <a className="twist" href='http://localhost:8888'>
      <button>Login With Spotify</button>
      </a>
      <div> Now Playing:<h2 style={{color:'gold'}}>{this.state.nowPlaying.name}</h2></div>
      <div> Artist: {this.state.nowPlaying.artist} </div>
      <div> Song Playing on: {this.state.nowPlaying.device} </div>
      <div>
         <img src={this.state.nowPlaying.image} style={{width:300}} />
         </div>
         <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
         </button>
        <h5>Did nothing happen? Make sure you sign into Spotify first</h5>
         <h2>Like the song thats playing? Check out the whole album here and give it a listen.</h2>
         <a href={this.state.nowPlaying.album} target="_blank">
          <button>Here</button>
          </a>

      </div>
    );
  }
}

export default Playing;
