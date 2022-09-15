import { Menu } from '@headlessui/react'
import Logo from './Logo';
import RdrButton from './RdrButton';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { signOutGoogle } from '../lib/firebase';
import HeaderAccount from './HeaderAccount';

// const user = {
//   name: 'Chelsea Hagon',
//   email: 'chelsea.hagon@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   photoURL: null,
// }
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { user } = useContext(UserContext)

  return (
    <header
      className="bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative flex justify-between items-center">
          <Logo />

          <div className="flex">
            <HeaderAccount />
          </div>
        </div>
      </div>
    </header>
  )
}