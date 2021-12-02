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
                <ul className="grid grid-cols-3 gap-4">
                  {
                    books.map(book =>
                      <Link className="flex-1 border-4 hover:bg-ruskee hover:text-white border-ruskee bg-none text-center p-10 rounded-lg" to={'/kirja/' + book.id}>
                        <li className="text-center center" key={book.id}>
                            {book.familyName}
                        </li>
                        </Link>
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