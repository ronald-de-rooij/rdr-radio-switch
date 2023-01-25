import { FormEvent, useEffect, useState, useRef } from 'react'
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import {
  db,
  storage,
  ref,
  getDownloadURL,
  uploadString,
} from '../../lib/firebase'

import AdminAuth from '../../components/AdminAuth'

export default function ProtectedRoute() {
  const [state, setStream] = useState({
    name: '',
    url: '',
    image: null,
  })

  const audioRef = useRef<HTMLAudioElement>()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStream({
        ...state,
        [e.target.name]: await handleFileUpload(e.target.files[0]),
      })
      return
    }
    setStream({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (state.url && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [state.url])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    addDoc(collection(db, 'streams'), {
      name: state.name,
      url: state.url,
    })
      .then((document) => {
        if (state.image) {
          const storageRef = ref(storage, `posts/${document.id}`)
          uploadString(storageRef, state.image, 'data_url').then((snapshot) => {
            getDownloadURL(snapshot.ref).then((URL) => {
              setDoc(
                doc(db, 'streams', document.id),
                { image: URL },
                { merge: true }
              )
              console.log('File available at ', URL)
            })
          })
        }
      })
      .finally(() => {
        setStream({
          name: '',
          url: '',
          image: null,
        })
      })
  }

  const handleFileUpload = (file: Blob) => {
    const result = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    return result
  }

  return (
    <AdminAuth>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block font-bold text-gray-700">
              Name
            </label>
            <div className="mt-1 mb-3">
              <input
                type="text"
                name="name"
                id="name"
                required={true}
                value={state.name}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <label htmlFor="url" className="block font-bold text-gray-700">
              URL
            </label>
            <div className="mt-1 mb-3">
              <input
                type="url"
                name="url"
                id="url"
                required={true}
                value={state.url}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {state.url ? (
              <>
                <audio controls ref={audioRef} className="mx-auto my-4">
                  <source src={state.url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <p className="text-sm text-center italic">
                  Is the stream working?
                </p>
              </>
            ) : null}

            <label htmlFor="url" className="block font-bold text-gray-700">
              Select Image
            </label>
            <input
              type="file"
              onChange={handleChange}
              id="image"
              name="image"
              className="block w-full px-3 py-1.5 text-sm text-gray-700 border border-solid border-gray-300 rounded mt-1 mb-3"
            />
            {state.image ? (
              <div className="w-full">
                <img
                  src={state.image}
                  alt="Preview upload"
                  className="mx-auto"
                />
              </div>
            ) : null}

            <button
              className="w-full p-2 mt-3 text-white duration-300 bg-blue-600 shadow hover:bg-blue-700"
              type="submit"
            >
              Add stream
            </button>
          </form>
        </div>
      </div>
    </AdminAuth>
  )
}
