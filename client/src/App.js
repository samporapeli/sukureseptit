import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BookView from './components/BookView'
import RecipeView from './components/RecipeView'
import Home from './components/Home'
import LoggedOutView from './components/LoggedOutView'

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null)

  return (
    <>
      <Header currentUser={currentUser} />
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={ <LoggedOutView setCurrentUser={setCurrentUser} /> } />
            <Route path='koti/*' element={<Home />} />
            <Route path='kirja/:bookID' element={<BookView />} />
            <Route path='kirja/:bookID/resepti/:recipeID' element={<RecipeView />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
