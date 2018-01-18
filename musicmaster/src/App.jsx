import React, {Component} from 'react';
import './App.css';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import Profile from './profile';
import Gallery from './Gallery';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      query:'',
      artist:null,
      tracks:[]

    }
  }
  search(){
    console.log(this.state);
    const BASE_URL='https://api.spotify.com/v1/search?';
    let FETCH_URL=`${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL='https://api.spotify.com/v1/artists/';
    var accessToken='BQCRn7hvsuzwvd5hpqUf_px7J5SU2J6wTvPa6mdNzThw7F9dGXuWwBOOa6nZuvu0_sZ5L8QzOLTc2mhtsddx-wAxC-T43Hi-BvouxfRT2l7GbJK7QNEB4eWnRHM3s1gCdX0r2fkPJyYPcPrU5tHHy54701qMF1iS_euj2YLf4-GgrCt0jg';
    var myOptions = {
     method: 'GET',
     headers: {
       'Authorization': 'Bearer ' + accessToken
     },
     mode: 'cors',
     cache: 'default'
   };
    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json=>{
      const artist=json.artists.items[0];
      this.setState({artist});
      FETCH_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL,myOptions)
      .then(response => response.json())
      .then(json=>{
        console.log('top tracks', json);
        const {tracks}=json;
        this.setState({tracks});
      })
    });
      }

  render(){
    return(
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
             type="text"
             placeholder="Search for an artist"
             value={this.state.query}
             onChange={event=>{this.setState({query:event.target.value})}}
             onKeyPress={event=>{
               if(event.key==='Enter'){
                 this.search();
               }
             }}
              />
            <InputGroup.Addon onClick={() =>this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>

        </FormGroup>
        {
          this.state.artist!==null
          ?
          <div>
            <Profile
      artist={this.state.artist}
              />
            <Gallery
          tracks={this.state.tracks}
              />
          </div>
        : <div></div>

        }

      </div>
    )
  }
}
export default App;
