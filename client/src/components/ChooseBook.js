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
      {
        ! books
          ? 'Loading...'
          :
            <>
              <div className='container px-10 mx-auto'>
                <h2>Valitse reseptikirja, johon haluat lisätä reseptin</h2>
                <ul>
                  {
                    books.map(book =>
                        <li key={book.id}>
                          <Link to={'/kirja/' + book.id +'/uusiresepti'}>
                            {book.familyName}
                          </Link>
                        </li>
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