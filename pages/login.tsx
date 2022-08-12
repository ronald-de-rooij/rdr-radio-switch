import { signInPopup, signOutGoogle } from "../lib/firebase";
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import UsernameForm from "../components/UsernameForm";
import ImageUploader from "../components/ImageUploader";

export default function Login(props) {
  const { user, username } = useContext(UserContext)
  console.log('test', user, username)

  return (
    <>
      <main>
        {user ?
          !username ? <><UsernameForm /> <SignInButton /></> : <SignOutButton />
          :
          <SignInButton />
        }
        <ImageUploader />
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
      <img src={'/google.png'} width="30px" /> Sign in with Google
    </button>
  )
}

function SignOutButton() {
  return <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => signOutGoogle()}>Sign out</button>
}

// function UsernameForm() {
//   return <p>UsernameForm</p>
// }