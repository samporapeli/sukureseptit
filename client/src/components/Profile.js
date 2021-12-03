import React from 'react'
import { Link } from 'react-router-dom'

const Profile = ({ currentUser, setCurrentUser }) => {
  const logout = () => {
    window.localStorage.removeItem('sukuresepti_token')
    setCurrentUser(null)
    window.location = '/'
  }

  if (currentUser) {
    return (
      <>
      <div className="container font-Castoro p-10">
        <h3>Hei, { currentUser.firstName + ' ' + currentUser.lastName }</h3>
        <p className="text-gray-500">Sähköpostiosoite: <a className="underline" href={ 'mailto:' + currentUser.email }>
          { currentUser.email }
        </a></p>
        <p className="mt-2 mb-2">Omat reseptikirjasi löydät <Link className="underline" to='/koti'>Koti-sivultasi</Link>.</p>
        <button class='btn btn-green' onClick={logout}>Kirjaudu ulos</button>
      </div>
      </>
  )} else {
    return (
      <p>Ladataan...</p>
    )
  }
}

export default Profile