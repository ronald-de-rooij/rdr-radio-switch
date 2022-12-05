import React, { useState, useRef } from 'react'

interface Props {
  stream: string
}

export default function CurrentlyPlaying({ stream }: Props) {
  React.useEffect(() => {
    setAudioStream(stream)
  }, [stream])

  const [playingStream, setPlayingStream] = useState(null)
  const audioRef = useRef<HTMLAudioElement>()

  const setAudioStream = (stream: string) => {
    setPlayingStream(stream)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play()
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-black uppercase font-press">Playing</h1>
      {playingStream ? (
        <h2 className="text-xl font-light uppercase font-press">
          {' '}
          {playingStream.name}
        </h2>
      ) : null}
      <audio controls ref={audioRef} className="mx-auto my-4">
        <source
          src={playingStream ? playingStream.url : null}
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
