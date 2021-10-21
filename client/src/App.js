import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import RecipeBookCover from './components/RecipeBookCover'

const App = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Sukureseptit</h1>
        <RecipeBookCover />
      </div>
      <Footer />
    </>
  )
}

export default App
