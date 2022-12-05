import { signInPopup, signOutGoogle } from "../lib/firebase";
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import UsernameForm from "../components/UsernameForm";
import Image from 'next/image'

export default function Login(props) {
  const { user, username } = useContext(UserContext)

  return (
    <>
      <main>
        {user ?
          !username ? <><UsernameForm /> <SignInButton /></> : <SignOutButton />
          :
          <SignInButton />
        }
        <UsernameForm />
      </main>
    </>
  )
}


function SignInButton() {

  const signInWithGoogle = () => {
    signInPopup()
  }

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <Image src={'/google.png'} width="30" height="30" alt="Sign in with Google logo" /> Sign in with Google
    </button>
  )
}

function SignOutButton() {
  return <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => signOutGoogle()}>Sign out</button>
}

// function UsernameForm() {
//   return <p>UsernameForm</p>
// }