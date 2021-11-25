import React from 'react'
import TopNav from './TopNav'

const Header = ({ currentUser }) => {
  return (
    <>
      <TopNav currentUser={currentUser} />
    </>
  )
}

export default Header
