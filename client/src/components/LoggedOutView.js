import React, { useState } from 'react'
import loginService from '../services/login'

const LoggedOutView = ({ setCurrentUser }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const login = async (event) => {
    event.preventDefault()
    const response = await loginService.login({ email, password })
    setCurrentUser(response.data.user)
    window.localStorage.setItem('sukuresepti_token', response.data.token)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <p>Katso alta, miten Sukureseptit toimii, tai kirjaudu sisään!</p>
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
    </>
  )
}

export default LoggedOutView