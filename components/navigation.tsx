/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import {
  BellIcon,
  Disclosure,
  Menu,
  MenuIcon,
  NavLink,
  React,
  Transition,
  XIcon,
} from "./deps.ts";
import { TwindContext } from "./twind.ts";
const { Fragment, useContext } = React;

const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Posts", to: "/posts" },
];

export const Navigation = () => {
  const { tw } = useContext(TwindContext);
  return (
    <Disclosure as="nav" className={tw`bg-gray-800`}>
      {({ open }) => (
        <>
          <div className={tw`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8`}>
            <div
              className={tw`relative flex items-center justify-between h-16`}
            >
              <div
                className={tw
                  `absolute inset-y-0 left-0 flex items-center sm:hidden`}
              >
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className={tw
                    `inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                >
                  <span className={tw`sr-only`}>Open main menu</span>
                  {open
                    ? <XIcon className={tw`block h-6 w-6`} aria-hidden="true" />
                    : (
                      <MenuIcon
                        className={tw`block h-6 w-6`}
                        aria-hidden="true"
                      />
                    )}
                </Disclosure.Button>
              </div>
              <div
                className={tw
                  `flex-1 flex items-center justify-center sm:items-stretch sm:justify-start`}
              >
                <div className={tw`flex-shrink-0 flex items-center`}>
                  <img
                    className={tw`block lg:hidden h-8 w-auto`}
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className={tw`hidden lg:block h-8 w-auto`}
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className={tw`hidden sm:block sm:ml-6`}>
                  <div className={tw`flex space-x-4`}>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        end
                        className={({ isActive }) => (tw`
                        ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                        px-3 py-2 rounded-md text-sm font-medium
                      `)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={tw
                  `absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}
              >
                <button
                  className={tw
                    `bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                >
                  <span className={tw`sr-only`}>View notifications</span>
                  <BellIcon className={tw`h-6 w-6`} aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className={tw`ml-3 relative`}>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button
                          className={tw
                            `bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                        >
                          <span className={tw`sr-only`}>Open user menu</span>
                          <img
                            className={tw`h-8 w-8 rounded-full`}
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className={tw
                            `origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={tw`
                                ${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700
                              `}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={tw`
                                ${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700
                              `}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={tw`
                                ${active ? "bg-gray-100" : ""}
                                block px-4 py-2 text-sm text-gray-700
                              `}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className={tw`sm:hidden`}>
            <div className={tw`px-2 pt-2 pb-3 space-y-1`}>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end
                  className={({ isActive }) => (tw`
                  ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  block px-3 py-2 rounded-md text-base font-medium
                `)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
