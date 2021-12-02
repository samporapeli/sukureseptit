import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Header from './components/Header'
import BookView from './components/BookView'
import RecipeView from './components/RecipeView'
import Home from './components/Home'
import Profile from './components/Profile'
import LoggedOutView from './components/LoggedOutView'
import loginService from './services/login'
import CreateRecipeView from './components/CreateRecipeView'
import ChooseBook from './components/ChooseBook'

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null)
  const params = useParams()

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
      <Header currentUser={currentUser} bookID={params.bookID} />
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
            <Route path='kirja/:bookID/*' element={<BookView currentUser={currentUser} />} />
            <Route path='kirja/:bookID/resepti/:recipeID/*' element={<RecipeView />} />
            <Route path='kirja/:bookID/uusiresepti' element={<CreateRecipeView />} />
            <Route path='uusiresepti/*' element={<ChooseBook currentUser={currentUser} />}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
