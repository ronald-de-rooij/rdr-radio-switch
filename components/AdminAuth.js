import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'

import router from 'next/router'
import Loading from './Loading'

export default function AdminAuth({ children }) {
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return <Loading />
  } else if (user) {
    if (user?.uid !== process.env.ADMIN_ID) router.push('/')
    else return <>{children}</>
  } else if (error) {
    return <div>There was an authentication error.</div>
  } else {
    router.push('/')
  }
}
