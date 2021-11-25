import React from 'react'
import { Link } from 'react-router-dom'

const Profile = ({ currentUser, setCurrentUser }) => {
  if (currentUser) {
    return (
      <>
        <h2>{ currentUser.firstName + ' ' + currentUser.lastName }</h2>
        <p>Etunimi: { currentUser.firstName }</p>
        <p>Sukunimi: { currentUser.lastName }</p>
        <p>Sähköpostiosoite: <a href={ 'mailto:' + currentUser.email }>
          { currentUser.email }
        </a></p>
        <p>Omat reseptikirjasi löydät <Link to='/koti'>Koti-sivultasi</Link></p>
      </>
  )} else {
    return (
      <p>Ladataan...</p>
    )
  }
}

export default Profile