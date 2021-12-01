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
      <p>Katso alta, miten Sukureseptit toimii, kirjaudu sisään tai rekisteröidy!</p>
      { currentUser ? <Navigate to='/koti' /> : <></> }
      { !registration
      ? 
      <form onSubmit={login}>
        <input
          type='text'
          value={email}
          onChange={event => setEmail(event.target.value)}
          placeholder='osoite@palvelu.fi'>
        </input>
        <br />
        <input
          type='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder='salasana'>
        </input>
        <br />
        <input type='submit' value='Kirjaudu sisään'></input>
      </form>
      :
      <form onSubmit={register}>
        <input
          type='text'
          value={newUser.firstName}
          onChange={event => updateNewUser(event, 'firstName')}
          placeholder='Etunimi'
        />
        <br />
        <input
          type='text'
          value={newUser.lastName}
          onChange={event => updateNewUser(event, 'lastName')}
          placeholder='Sukunimi'
        />
        <br />
        <input
          type='email'
          value={newUser.email}
          onChange={event => updateNewUser(event, 'email')}
          placeholder='sähköpostiosoite'
        />
        <br />
        <input
          type='password'
          value={newUser.salasana}
          onChange={event => updateNewUser(event, 'password')}
          placeholder='*****'
        />
        <br />
        <input type='submit' value='Rekisteröidy'></input>
      </form>
      }
      <button onClick={() => setRegistration(!registration)}>
        { !registration ? 'Tarvitsetko käyttäjätunnuksen?' : 'Onko sinulla jo käyttäjätunnus?'}
      </button>
    </>
  )
}

export default LoggedOutView