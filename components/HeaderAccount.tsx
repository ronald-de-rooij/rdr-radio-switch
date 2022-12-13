import { useContext, Fragment } from 'react'
import { signInPopup, signOutGoogle } from '../lib/firebase'
import { Menu, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon, CogIcon } from '@heroicons/react/24/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import RdrButton from './RdrButton'
import Link from 'next/link'

function menuItemClass(...classes: string[]) {
  return `${classes
    .filter(Boolean)
    .join(' ')} group flex items-center px-4 py-2 text-sm`
}

export default function HeaderAccount() {
  const [user] = useAuthState(auth)

  return (
    <>
      {!user ? (
        <RdrButton url="#" link="Login" onClick={() => signInPopup()} />
      ) : (
        <Menu as="div" className="relative inline-block text-left h-10">
          <Menu.Button>
            <picture>
              <img
                className="w-10 h-10 rounded-full"
                src={user?.photoURL || '/hacker.png'}
                alt="logo-radio-switch"
                referrerPolicy="no-referrer"
              />
            </picture>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/admin"
                      className={menuItemClass(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      )}
                    >
                      <CogIcon
                        className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={menuItemClass(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      )}
                      onClick={signOutGoogle}
                    >
                      <ArrowLeftOnRectangleIcon
                        className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  )
}
