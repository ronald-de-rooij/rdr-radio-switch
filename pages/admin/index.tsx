import Router from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db, storage, ref, getDownloadURL, uploadString } from '../../lib/firebase';



export default function ProtectedRoute() {
  const { user } = useContext(UserContext)
  useEffect(() => {
    // if user is not authenticated, redirect to login page
    if (!user) return
    if (user.email !== 'ronaldderooij17@gmail.com') Router.push('/login')
  })

  const [state, setState] = useState({
    name: '',
    url: '',
    image: null
  })

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setState({
        ...state,
        [e.target.name]: await handleFileUpload(e.target.files[0])
      })
      return
    }
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    addDoc(collection(db, "streams"), {
      name: state.name,
      url: state.url,
    }).then((document) => {
      if (state.image) {
        const storageRef = ref(storage, `posts/${document.id}`);
        uploadString(storageRef, state.image, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref).then((URL) => {
            setDoc(
              doc(db, "streams", document.id),
              { image: URL },
              { merge: true }
            );
            console.log("File available at ", URL);
          });
        });
      }
    }).finally(() => {
      setState({
        name: '',
        url: '',
        image: null
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
  };

  return (
    <div className="flex items-center justify-center bg-white p-8">
      <div className="mx-auto w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block font-medium text-gray-700">
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
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <label htmlFor="url" className="block font-medium text-gray-700">
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
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <label htmlFor="url" className="block font-medium text-gray-700">
            Select Image
          </label>
          <input type="file" onChange={handleChange} id="image" name="image" className="block w-full px-3 py-1.5 text-sm text-gray-700 border border-solid border-gray-300 rounded mt-1 mb-3" />
          {state.image ?
            <div className='w-full'>
              <img src={state.image} alt="Preview upload" className='mx-auto' />
            </div> : null}


          <button className='w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 mt-3' type='submit'>
            Add stream
          </button>
        </form>
      </div>
    </div>
  )
}