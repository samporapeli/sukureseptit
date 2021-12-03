import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import loginService from '../services/login'

const LoggedOutView = ({ currentUser, setCurrentUser }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ newUser, setNewUser ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [ registration, setRegistration ] = useState(false)

  const login = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({ email, password })
      window.localStorage.setItem('sukuresepti_token', response.data.token)
      setCurrentUser((await loginService.fetchUser()).data.user)
      setEmail('')
      setPassword('')
    } catch (e) {
      console.error(e)
    }
  }

  const updateNewUser = (event, key) => {
    const newUserCopy = { ...newUser }
    newUserCopy[key] = event.target.value
    setNewUser(newUserCopy)
  }

  const register = async (event) => {
    event.preventDefault()
    try {
      await loginService.register(newUser)
      setEmail(newUser.email)
      setPassword(newUser.password)
      // need to pass some event so...
      await login(event)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <div className="container font-Castoro">
      <h4 className="mt-10">Tervetuloa Sukuresepteihin!</h4>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
      <div className="col-span-1 col-start-1 flex flex-col bg-valkoinen rounded-lg shadow-md">
      
      { currentUser ? <Navigate to='/koti' /> : <></> }
      { !registration
      ? 
      <div>
      <h5 className="flex flex-col items-center mt-4">Kirjautuminen</h5>
      <form className="flex flex-col items-center" onSubmit={login}>
        <input
          className="mt-4 p-4"
          type='text'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='osoite@palvelu.fi'>
        </input>
        <br />
        <input
          className="p-4"
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder='salasana'>
        </input>
        <br />
        <button className="btn btn-green bg-vihree" type='submit' value='Kirjaudu sisään'>Kirjaudu sisään</button>
      </form>
      </div>
      :
      <div>
      <h5 className="flex flex-col items-center mt-4">Rekisteröityminen</h5>
      <form className="flex flex-col items-center" onSubmit={register}>
        <input
          className="p-4 mt-4"
          type='text'
          value={newUser.firstName}
          onChange={event => updateNewUser(event, 'firstName')}
          placeholder='Etunimi'
        />
        <br />
        <input
          className="p-4"
          type='text'
          value={newUser.lastName}
          onChange={event => updateNewUser(event, 'lastName')}
          placeholder='Sukunimi'
        />
        <br />
        <input
          className="p-4"
          type='email'
          value={newUser.email}
          onChange={event => updateNewUser(event, 'email')}
          placeholder='sähköpostiosoite'
        />
        <br />
        <input
          className="p-4"
          type='password'
          value={newUser.salasana}
          onChange={event => updateNewUser(event, 'password')}
          placeholder='*****'
        />
        <br />
        <button className="btn btn-green bg-vihree" type='submit' value='Rekisteröidy'>Rekisteröidy</button>
      </form>
      </div>
      }
      <button className="my-6 underline" onClick={() => setRegistration(!registration)}>
        { !registration ? 'Tarvitsetko käyttäjätunnuksen?' : 'Onko sinulla jo käyttäjätunnus?'}
      </button>
      </div>
      </div>
    </div>
    </>
  )
}

export default LoggedOutView