import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = ({ recipes }) => {
  return (
    <>
      <div className="container font-Castoro">
      <h5>Kaikki kirjasi</h5>
      {
        recipes
          ? <ul className='list-disc'>
              { recipes.books.map(book => { return (
                <Link to={`/kirja/${book.id}`}>
                  <li key={ book.id }>{ book.familyName }</li>
                </Link>
                )})
              }
            </ul>
          : 'Loading...'
      }
      </div>
    </>
  )
}

export default SideNav