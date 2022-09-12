import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function ProtectedRoute() {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  console.log(user)

  useEffect(() => {
    // if user is not authenticated, redirect to login page
    if (!user) return
    if (user.email !== 'ronaldderooij17@gmail.com') Router.push('/login')
    setLoading(false)
  })

  if (loading) return <p>Loading...</p>
  return (
    <div className='wrapper'>
      <h1>This is a protected route. Keep away</h1>
    </div>
  )
}