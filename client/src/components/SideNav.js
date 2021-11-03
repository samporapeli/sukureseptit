import React from 'react'

const SideNav = ({ recipes }) => {
  return (
    <>
      <p>SideNav</p>
      {
        recipes
          ? <ul className='list-disc'>
              { recipes.books.map(book =>
                <li key={ book.id }>{ book.name }</li>)
              }
            </ul>
          : 'Loading...'
      }
    </>
  )
}

export default SideNav