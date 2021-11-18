import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoggedInView from './components/LoggedInView'

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={
            <h2>Please <Link to={'home'}>Log in</Link></h2>
          } />
            <Route path='/home*' element={<LoggedInView />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
