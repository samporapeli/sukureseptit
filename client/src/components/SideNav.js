import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = ({ recipes }) => {
  return (
    <>
      <p>SideNav</p>
      {
        recipes
          ? <ul className='list-disc'>
              { recipes.map(book => { return (
                <Link to={`/kirja/${book.id}`}>
                  <li key={ book.id }>{ book.familyName }</li>
                </Link>
                )})
              }
            </ul>
          : 'Loading...'
      }
    </>
  )
}

export default SideNav