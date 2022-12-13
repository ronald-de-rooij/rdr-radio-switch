import '../styles/globals.css'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'

function RadioSwitch({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default RadioSwitch
