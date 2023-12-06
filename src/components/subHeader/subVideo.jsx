import React from 'react'
import { flushSync } from 'react-dom'

const subVideo = () => {
  return (
    <div>
        <video autoPlay loop src="subvideo.mp4" muted className="mt-5 w-full h-auto hover:scale-110"/>

    </div>
  )
}

export default subVideo
