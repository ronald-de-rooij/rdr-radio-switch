import Image from 'next/image'

export default function Streams({ streams, streamSelected }) {
  return (
    <div className="grid grid-cols-12">
      {streams.map((stream) =>
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
