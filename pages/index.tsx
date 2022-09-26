import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { getCollection } from "../lib/firebase"
import React, { useRef } from 'react';

export default function Home() {
  // function getStreams() {
  const [playingStream, setPlayingStream] = useState(null)
  const [streams, setStreams] = useState([])
  const [audio, setAudio] = useState(null)
  const audioRef = useRef<HTMLAudioElement>()

  useEffect(() => {
    getCollection("streams").then((snapshot) => {
      setStreams(snapshot)
      setAudio(new Audio(snapshot[0].url)) // only call client
    })
  }, [])

  const setAudioStream = (stream) => {
    setPlayingStream(stream)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }

  // getStreams()
  return (
    <div className="p-8">
      <h1 className="font-press text-3xl font-black uppercase">Playing</h1>
      {playingStream ? <h2 className="font-press text-xl font-light uppercase"> {playingStream.name}</h2> : null}
      <audio controls ref={audioRef} className="my-4">
        <source src={playingStream ? playingStream.url : null} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <ul role="list" className="divide-y divide-gray-200">
        {streams.map((stream) => (
          <li key={stream.name} className="flex py-4" onClick={() => setAudioStream(stream)}>
            {stream.image ? <img src={stream.image} alt={stream.name} /> : null}
          </li>
        ))}
      </ul>

      {/* <button onClick={() => toast.success("Success!")}>Call a toast</button> */}
    </div >
  )
}

