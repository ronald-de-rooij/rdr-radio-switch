import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { getDoc, doc, db } from '../lib/firebase'
import debounce from 'lodash.debounce'

export default function UsernameForm() {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useContext(UserContext)

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        getDoc(doc(db, `books`, username)).then(doc => {
          setIsValid(doc.data().year === parseInt(username))
          setIsLoading(false)
        })

        console.log('Firestore read excuted!');
        // setIsValid(!exists)
        // setIsLoading(false)
      }
    }, 500),
    []
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await user.updateProfile({
        displayName: formValue
      })
      setIsValid(true)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleChange = (e) => {
    setFormValue(e.target.value)
  }


  return (
    user && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={user.title} onChange={handleChange} />
          <button type="submit">Submit</button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {isLoading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}