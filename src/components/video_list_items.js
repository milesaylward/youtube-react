import React from 'react';
import Linkify from 'react-linkify';

const VideoListItem = ({video, onVideoSelect}) => {
  const imageUrl = video.snippet.thumbnails.medium.url;

  return (
    <li
      onClick={() => onVideoSelect(video)}
      className='video-list-item'
      >
      <div className='video-list-container'>
        <div>
          <img
            src={imageUrl}
            alt='Video Thumbnail'
            className='video-thumbnail'
          />
        </div>
        <div>
          <p className='video-list-title'>
            {video.snippet.title}
          </p>
          <Linkify properties={{target: '_blank', style: {color: 'rgb(204, 255, 255)', fontWeight: 'bold'}}}>
            <p className='video-list-snippet'>
              {video.snippet.description}
            </p>
          </Linkify>
        </div>
      </div>
    </li>
  )
}

export default VideoListItem
