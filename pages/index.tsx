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
    console.log('1 ')
    getCollection("streams").then((snapshot) => {
      setStreams(snapshot)
      console.log('SNAPSHOT', snapshot)
      setAudio(new Audio(snapshot[0].url)) // only call client
    })
  }, [])


  // play audio sound
  const playSound = () => {
    audio.play();
  }

  // pause audio sound
  const pauseSound = () => {
    audio.pause();
  }

  // stop audio sound
  const stopSound = () => {
    audio.pause();
    audio.currentTime = 0;
  }

  const setAudioStream = (url: string) => {
    setPlayingStream(url)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }

  // getStreams()
  return (
    <div>
      <h1>Play Radio</h1>
      <hr />
      <audio controls ref={audioRef}>
        <source src={playingStream} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {playingStream}
      {streams.map((stream) => {
        return <ul key={stream.name} role="list" className="divide-y divide-gray-200" onClick={() => setAudioStream(stream.url)}>
          {streams.map((stream) => (
            <li key={stream.name} className="flex py-4">
              <img className="w-10 h-10 rounded-full" alt="" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{stream.name}</p>
                <p className="text-sm text-gray-500">{stream.title}</p>
              </div>
            </li>
          ))}
        </ul>
      })}

      <button onClick={() => toast.success("Success!")}>Successs</button>

      <div className="App">
        <h3 className="mb-4">Play an mp3 file - <a href="https://www.cluemediator.com">Clue Mediator</a></h3>

        <input type="button" className="mr-2 btn btn-primary" value="Play" onClick={playSound}></input>
        <input type="button" className="mr-2 btn btn-warning" value="Pause" onClick={pauseSound}></input>
        <input type="button" className="mr-2 btn btn-danger" value="Stop" onClick={stopSound}></input>
      </div>
    </div >
  )
}

