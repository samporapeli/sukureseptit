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
      setRegistration(false)
      // oh my i am sorry but just calling login function did not work for some reason
      document.getElementById('login-button').click()
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <div className="container font-Castoro">
      <h4 className="mt-10">Tervetuloa Sukuresepteihin!</h4>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 sm:max-w-xl md:max-w-xl lg:max-w-none lg:col-span-2 col-start-1 bg-valkoinen rounded-lg shadow-md p-8">
        <h4 className="mt-2">Koko suvun reseptit yhdessä paikassa.</h4>
        <p className="mt-2">Sukureseptien avulla koko perheen ja suvun reseptit säilyvät sukupolvelta toiselle. <br/> Suvun parhaat reseptit ovat salassa kun pääsy resepteihin on vain heillä, jotka olet kutsunut. </p>
        <p className="mt-8">Kirjaudu tai rekisteröidy luodaksesi reseptikirja.</p>
      </div>
      <div className="col-span-1 max-w-xl flex flex-col bg-valkoinen rounded-lg shadow-md">
      
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
        <button id='login-button' className="btn btn-green bg-vihree" type='submit' value='Kirjaudu sisään'>Kirjaudu sisään</button>
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
      <p className="mt-6">Näin yksinkertaista se on:</p>
      <div className="mt-2 mb-10 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-ruskee text-white shadow-md span-col-1 p-10">

            <p>1. Rekisteröidy palveluun!</p>
        </div>
        <div className="bg-vihree text-white shadow-md span-col-1 p-10">
            <p>2. Luo reseptikirja</p>
        </div>
        <div className="bg-kulta text-white shadow-md span-col-1 p-10">
            <p>3. Lisää reseptikirjaan reseptisi</p>
        </div>
        <div className="bg-beige text-white shadow-md span-col-1 p-10">
            <p>4. Kutsu sukulaiset tai kaverisi katsomaan ja kommentoimaan reseptikirjan reseptejä. He voivat myös lisätä kirjaan omat reseptinsä! </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoggedOutView