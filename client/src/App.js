import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BookView from './components/BookView'
import RecipeView from './components/RecipeView'
import Home from './components/Home'

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={
            <h2>Please <Link to={'koti'}>Log in</Link></h2>
          } />
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
