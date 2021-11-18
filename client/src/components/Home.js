import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import recipeService from '../services/recipeService'

const LoggedInView = () => {
  const [ books, setBooks ] = useState(null)

  useEffect(async () => {
    const res = await recipeService.books()
    setBooks(res.data.books)
  }, [])

  return (
    <>
      <h1>Sukureseptit</h1>
      {
        ! books
          ? 'Loading...'
          :
            <>
              <div className='container px-10 mx-auto'>
                <h2>Reseptikirjasi</h2>
                <ul>
                  {
                    books.map(book =>
                      <Link to={'/kirja/' + book.id}>
                        <li key={book.id}>{book.familyName}</li>
                      </Link>
                    )
                  }
                </ul>
              </div>
            </>
      }
    </>
  )
}

export default LoggedInView