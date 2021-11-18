import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoggedInView from './components/LoggedInView'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='logged-in' element={<LoggedInView />} />
        <Route path='/' element={
          <h2>Please <Link to={'logged-in'}>Log in</Link></h2>
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
