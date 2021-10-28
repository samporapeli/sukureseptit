import React from 'react'

const SideNav = ({ recipes }) => {
  return (
    <>
      <p>SideNav</p>
      <ul>
        { recipes.books.map(book =>
          <li key={ book.id }>{ book.name }</li>
        )}
      </ul>
    </>
  )
}

export default SideNav