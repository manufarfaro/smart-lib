import { useCallback, useEffect, Fragment, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon, BookOpenIcon, UserCircleIcon } from '@heroicons/react/outline';
import { getSigner } from '../lib/web3';
import Image from 'next/image';

const user = {
    name: 'manufarfaro',
    email: 'manufarfaro@gmail.com',
}
const navigation = [
    { name: 'Home', href: '/' }
]

const AppHeader = () => {
    const router = useRouter();
    const [account, setAccount] = useState<string | null>(null)

    const handleMenuClick = useCallback((e) => {
        e.preventDefault();
        router.push(e.target.value);
    }, []);

    const connectWallet = useCallback(async () => {
        try {
            const signer = await getSigner()
            if (!signer) return
            const addr = await signer.getAddress()
            setAccount(addr)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
        }
    }, [])

    useEffect(() => {
        router.prefetch('/');
    }, []);

    useEffect(() => {
        const anyWindow = window as any
        if (!anyWindow?.ethereum) return
        const onAccountsChanged = (accs: string[]) => setAccount(accs?.[0] ?? null)
        const onChainChanged = () => setAccount((a: string | null) => a)
        anyWindow.ethereum.on?.('accountsChanged', onAccountsChanged)
        anyWindow.ethereum.on?.('chainChanged', onChainChanged)
        return () => {
            anyWindow.ethereum.removeListener?.('accountsChanged', onAccountsChanged)
            anyWindow.ethereum.removeListener?.('chainChanged', onChainChanged)
        }
    }, [])

    return(
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookOpenIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              router.asPath === item.href
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={router.asPath === item.href ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div className="flex items-center gap-3">
                          {account && (
                            <span className="text-xs text-gray-300">{account.slice(0,6)}…{account.slice(-4)}</span>
                          )}
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon className="h-8 w-8 text-gray-300" aria-hidden="true" />
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
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={connectWallet}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block w-full text-left px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {account ? 'Reconnect Wallet' : 'Connect Wallet'}
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      onClick={handleMenuClick}
                      className={classNames(
                        router.asPath === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={router.asPath === item.href ? 'page' : undefined}
                    >
                        {item.href}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="h-10 w-10 text-gray-300" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Disclosure.Button
                      as="button"
                      onClick={connectWallet}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {account ? 'Reconnect Wallet' : 'Connect Wallet'}
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
    );
};

export default AppHeader