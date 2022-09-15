import '../styles/globals.css'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {

  const userData = useUserData()

  return (
    <UserContext.Provider value={userData}>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
