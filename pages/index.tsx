import React, { useState } from 'react'
import CurrentlyPlaying from '../components/CurrentlyPlaying'
import Streams from '../components/Streams'

export default function Home() {
  const [playingStream, setPlayingStream] = useState(null)

  return (
    <div className="max-w-screen-xl p-8 mx-auto">
      <CurrentlyPlaying stream={playingStream} />
      <Streams streamSelected={setPlayingStream} />
    </div>
  )
}
