import React, { Component } from 'react';
import search from './youtubeSearch';
import axios from 'axios';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAuxrd01gKCLl7gQKcYG2WzEJHnP9-LJtw';
const ROOT_URL ='https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      searchSubmitted: false,
      intervalId: 0,
      noResults: false
     };
   }
//Hey miles this is hardcoded to only recieve 15 videos you know you need to fix that for better UX
   videoSearch(term){
     search({key: API_KEY, term: term, maxResults: 30}, (videos) => {
       if (videos.length < 1) {
         this.setState({videos: [], noResults: true});
         return;
       } else {
         this.setState({
           videos,
           selectedVideo: null,
           searchSubmitted: true,
           description: '',
           noResults: false
         });
       }
     });
     console.log(this.state.noResults);
   }

   scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 70);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), 17);
    this.setState({ intervalId: intervalId });
  }

   selectVideo(selectedVideo, idx) {
     const { videoId } = selectedVideo.id;
     axios.get(`${ROOT_URL}${videoId}&key=${API_KEY}`)
      .then(res => {
         let detail = res.data.items[0].snippet.description;
         this.scrollToTop();
         this.setState({
           selectedVideo,
           description: detail
         });
         document.body.classList.add('control');
      });
   }

   closeVideo() {
     this.setState({selectedVideo: null});
     document.body.classList.remove('control');
   }

  render() {
    const { selectedVideo, searchSubmitted, noResults } = this.state;
    return (
      <div>
        <SearchBar
          search={searchSubmitted}
          onSearchTermChange={term => this.videoSearch(term)}
        />
        {
          noResults === true
          ?
          <div className='no-results'>Sorry No Results found<br />Try Searching again!</div>
          :
          <div></div>
        }
        {
          selectedVideo !== null
          ?
          <div className='video-container'>
            <VideoDetail
              video={this.state.selectedVideo}
              description={this.state.description}
            />
            <button
              onClick={this.closeVideo.bind(this)}
              className='close-video-button'
              >X</button>
          </div>
          :
          <div></div>
        }
          <VideoList
            onVideoSelect={(selectedVideo, idx) => this.selectVideo(selectedVideo, idx) }
            videos={this.state.videos}
            class={selectedVideo ? 'float-list' : ''}
          />
      </div>
    );
  }
}

export default App;
