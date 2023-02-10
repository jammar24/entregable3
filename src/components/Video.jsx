import React from 'react'
import ReactPlayer from 'react-player'
import rr from '../videos/rr.mp4'


function Video () {
  return (
    <div className='video' style={{  display:' absolute',
        position:  ' fixed  ',
        right: ' 50%',
        bottom:'1%' }}>
    <ReactPlayer 
     url={rr}
     controls
     playing
     width='20%'
     height='20%'
     
    />
    </div>
  )
}

export default Video