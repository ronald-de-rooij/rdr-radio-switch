import { useContext, Fragment } from 'react';
import { UserContext } from '../lib/context';
import { signInPopup, signOutGoogle } from '../lib/firebase';
import { Menu, Transition } from '@headlessui/react'
import {
  LogoutIcon, CogIcon
} from '@heroicons/react/outline'
import RdrButton from './RdrButton';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderAccount() {
  const { user } = useContext(UserContext)
  console.log(user)


  return (
    <>
      {!user ? <RdrButton url='javascript:;' link='Login' onClick={() => signInPopup()} /> :

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <picture>
                <img className="h-8 w-8 rounded-full" src={user?.photoURL || "/hacker.png"} alt="logo-radio-switch" />
              </picture>
            </Menu.Button>
          </div>


          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="javascript:;"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm'
                      )}
                      onClick={() => signOutGoogle()}
                    >
                      <CogIcon
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm'
                      )}
                      onClick={signOutGoogle}
                    >

                      <LogoutIcon
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
      }
    </>
  )
}