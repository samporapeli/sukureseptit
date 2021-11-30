import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BookView from './components/BookView'
import RecipeView from './components/RecipeView'
import Home from './components/Home'
import Profile from './components/Profile'
import LoggedOutView from './components/LoggedOutView'
import loginService from './services/login'

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = window.localStorage.getItem('sukuresepti_token')
      if (!token) return
      try {
        const res = await loginService.fetchUser() // function will fetch the token from localstorage
        setCurrentUser(res.data.user)
      } catch (e) {
        console.error(e)
      }
    }
    fetchUserData()
  }, [])

  return (
    <>
      <Router>
        <Header currentUser={currentUser} />
        <Routes>
          <Route path='/'>
            <Route
              index
              element={ <LoggedOutView currentUser={currentUser} setCurrentUser={setCurrentUser} /> }
            />
            <Route
              path='/profiili'
              element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />}
            />
            <Route path='koti/*' element={<Home />} />
            <Route path='kirja/:bookID' element={<BookView currentUser={currentUser} />} />
            <Route path='kirja/:bookID/resepti/:recipeID' element={<RecipeView />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
