import Image from 'next/image'
import useStreams from '../hooks/useStreams'
import Loading from './Loading'

interface Stream {
  name: string
  image: string
}

export default function Streams({ streamSelected }) {
  const { streams, loading } = useStreams()

  return loading ? (
    <Loading />
  ) : (
    <div className="grid grid-cols-12">
      {streams.map((stream: Stream) =>
        stream.image ? (
          <Image
            src={stream.image}
            alt={stream.name}
            width={96}
            height={60}
            key={stream.name}
            onClick={() => streamSelected(stream)}
            className="mx-auto cursor-pointer"
          />
        ) : null
      )}
    </div>
  )
}
