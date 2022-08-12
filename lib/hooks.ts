import { doc, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './firebase'

export function useUserData() {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    let unsubscribe

    if (user) {
      const docRef = doc(db, 'users', user.uid)
      unsubscribe = onSnapshot(docRef, (doc) => {
        setUsername(doc.data()?.displayName)
      })
    } else {
      setUsername(null)
    }
    return unsubscribe
  }, [user])

  return { user, username }
}
