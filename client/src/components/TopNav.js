import React from 'react'
import { Link } from 'react-router-dom'

const TopNav = ({currentUser}) => {

  return (
      <nav class="sm:flex items-center justify-between flex-wrap bg-yellow-400 p-6">
      <div class="flex items-center flex-shrink-0 text-black mr-6">
        <span class="font-semibold text-xl tracking-tight">
          Sukureseptit
        </span>
      </div>
      <div class="w-full block flex-initial lg:flex-grow lg:items-center lg:w-auto text-sm">
          <a  href="#"
              class="block mt-4 lg:inline-block lg:mt-0 text-green-600 hover:text-white">
                Lisää uusi resepti
          </a>
      </div>
{ currentUser ? (
    <div>
        <Link to="/profiili"
           class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                {currentUser.firstName + ' ' + currentUser.lastName}
        </Link>
    </div>
) : (
    <div>
        <a href="#"
           class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                Kirjaudu
        </a>
    </div>
  )}
    </nav>
  )


}

export default TopNav
