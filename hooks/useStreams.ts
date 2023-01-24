import { useState, useEffect } from 'react'
import { getCollection } from '../lib/firebase'

export default function useStreams() {
  const [streams, setStreams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    getCollection('streams').then((snapshot) => {
      setStreams(snapshot)
      setLoading(false)
    })
  }, [])

  

  return { streams, loading }
}
