import React from 'react';
import VideoListItem from './video_list_items';

const VideoList = (props) => {

const videoItems = props.videos.map((video, index) => {
  return (
    <VideoListItem
      onVideoSelect = {props.onVideoSelect}
      key={video.etag}
      video={video}
     />
  )
});

  return(
    <ul className={'video-list ' + props.class}>
      {videoItems}
    </ul>
  )
}

export default VideoList
