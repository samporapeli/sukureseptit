import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import recipeService from '../services/recipeService'
import InputRecipeBook from './InputRecipeBook'

const LoggedInView = () => {
  const [ books, setBooks ] = useState(null)

  useEffect(async () => {
    const res = await recipeService.books()
    setBooks(res.data.books)
  }, [])

  return (
    <>
    <div className="font-Castoro container">
      {
        ! books
          ? 'Loading...'
          :
            <>
              <div className=''>
                <h2>Reseptikirjasi</h2>
                <ul>
                  {
                    books.map(book =>
                        <li key={book.id}>
                          <Link to={'/kirja/' + book.id}>
                            {book.familyName}
                          </Link>
                        </li>
                    )
                  }
                </ul>
                <InputRecipeBook />
              </div>
            </>
      }
      </div>
    </>
  )
}

export default LoggedInView