import React, { useEffect, useState, useRef } from 'react'
import { getCollection } from '../lib/firebase'
import CurrentlyPlaying from '../components/CurrentlyPlaying'
import Streams from '../components/Streams'

export default function Home() {
  const [playingStream, setPlayingStream] = useState(null)
  const [streams, setStreams] = useState([])

  useEffect(() => {
    getCollection('streams').then((snapshot) => {
      setStreams(snapshot)
    })
  }, [])

  return (
    <div className="max-w-screen-xl p-8 mx-auto">
      <CurrentlyPlaying stream={playingStream} />
      <Streams streams={streams} streamSelected={setPlayingStream} />
    </div>
  )
}
