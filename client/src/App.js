import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import RecipeBookCover from './components/RecipeBookCover'
import SideNav from './components/SideNav'

const App = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Sukureseptit</h1>
        <SideNav />
        <RecipeBookCover />
      </div>
      <Footer />
    </>
  )
}

export default App
