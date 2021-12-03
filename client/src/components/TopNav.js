import React from 'react'
import { Link } from 'react-router-dom'


const TopNav = ({currentUser, bookID}) => {

  return (
      <nav className="font-Castoro container sm:flex items-center justify-between bg-yellow-400 flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link to='/'>
            Sukureseptit
          </Link>
        </span>
      </div>
      <div className="w-full block flex-initial lg:flex-grow lg:items-center lg:w-auto text-sm">
          <Link to={"/uusiresepti"}
          className="block mt-4 lg:inline-block lg:mt-0 hover:underline">
            Lisää uusi resepti
      </Link>
      </div>
{ currentUser ? (
    <div>
        <Link to="/profiili"
           className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                {currentUser.firstName + ' ' + currentUser.lastName}
        </Link>
    </div>
) : (
    <div>
        <Link to="/"
           className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                Kirjaudu
        </Link>
    </div>
  )}
    </nav>
  )


}

export default TopNav
