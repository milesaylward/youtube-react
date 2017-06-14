import React from 'react';
import Linkify from 'react-linkify';

const VideoDetail = (props) =>{
  const { description, video } = props
  if(!video){
    return <div></div>
  }
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;
  return(
    <div className='iframe-container'>
      <div className="video-container">
        <iframe width="853" height="480" src={url}></iframe>
      </div>
      <div>
        <div className='detail-title'>{video.snippet.title}</div>
        <Linkify properties={{target: '_blank', style: {color: 'rgb(204, 255, 255)', fontWeight: 'bold'}}}>
          <div className='detail-description'>{description}</div>
        </Linkify>
      </div>
    </div>
  )
};

export default VideoDetail;
