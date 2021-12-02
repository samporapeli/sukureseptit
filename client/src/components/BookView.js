import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'

const BookView = ({ currentUser }) => {
  const params = useParams()
  const [ book, setBook ] = useState(null)
  const [ family, setFamily ] = useState(null)
  const [ books, setBooks ] = useState(null)
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(async () => {
    const res = await recipeService.books()
    setBooks(res.data.books)
  }, [])

  useEffect(async () => {
    const res = await recipeService.book(params.bookID)
    setBook(res.data)
  }, [params])

  useEffect(() => {
    const fetchData = async () => {
      const res = await recipeService.family(params.bookID)
      setFamily(res.data)
    }
    fetchData()
  }, [params])

  const copyInviteLink = async () => {
    if (navigator.cliboard) {
      await navigator.clipboard.writeText(window.location.href)
      alert('Linkki kopioitu leikepöydälle!')
    }
    else
      alert('Selaimesi ei tue automaattista kopiointia. Kopioi osoitepalkin sisältö manuaalisesti!')
  }

  const joinToBook = async () => {
    const res = await recipeService.joinToBook(params.bookID)
    if (res.status !== 200) alert(`Error: ${res}`)
  }

  return (
    
    <>
      {
        ! book
          ? 'Loading...'
          :
            <>
              <SideNav recipes={books} />
              <div className='container font-Castoro px-10 mx-auto'>
                <Routes>
                  <Route path='/*'>
                    <Route index element={
                      <>
                        <Link to={`/kirja/${params.bookID}/uusiresepti`} className='btn btn-green flex items-center justify-center'>Lisää resepti</Link>
                        <RecipeBookCover recipes={book} family={family} currentUser={currentUser} />
                        <h3>Kirjan reseptit</h3>
                        { book
                          ? book.Recipes.length > 0
                            ?
                              <>
                                <input type='text' placeholder='hae reseptiä...' onChange={(event) => setSearchTerm(event.target.value.toLowerCase()) } />
                                <ul>
                                  {book.Recipes
                                    .filter(r => {
                                      const name = r.name.toLowerCase()
                                      const ingredients = r.Ingredients.map(i => i.name).join(' ').toLowerCase()
                                      const instructions = r.instructions.toLowerCase()
                                      return searchTerm.length === 0
                                        || [ name, ingredients, instructions]
                                          .join(' ')
                                          .includes(searchTerm)
                                    })
                                    .map(r => (
                                      <Link to={`/kirja/${params.bookID}/resepti/${r.id}`}>
                                        <li key={r.id}>
                                          {r.name}
                                        </li>
                                      </Link>))}
                                </ul>
                              </>
                            : <p>Kirjassa ei vielä ole reseptejä. <Link to={`/kirja/${params.bookID}/uusiresepti`}>Luo ensimmäinen klikkaamalla tästä.</Link></p>
                          : 'Ladataan...' 
                        }
                        <h3>Reseptikirjassa ovat mukana</h3>
                        <ul className='list-disc px-6'>
                          {family
                          ? family.members.map(member =>
                            <li key={member.id + ' ' + member.lastName}>
                              { member.firstName } { member.lastName }
                            </li>
                          )
                          : <li>Ladataan...</li>}
                        </ul>
                        <button className='btn btn-green' onClick={ copyInviteLink }>
                          Kopioi rekisteröitymislinkki
                        </button>
                        <p>Salaisen kirjalinkin kautta sukulaisesi saavat oikeuden tarkastella reseptikirjaa ja rekisteröitymisen jälkeen lisätä omia reseptejään.</p>
                        { currentUser && book && books && !books.map(b => b.id).includes(book.id)
                          ? <button className='btn btn-green' onClick={ joinToBook }>Liity suvun reseptikirjaan</button>
                          : <></>
                        } { currentUser ? <></> :
                          <button className='btn btn-green'><Link to='/'>Rekisteröidy lisätäksesi reseptejä</Link></button>
                        }

                      </>
                    }/>
                  </Route>
                </Routes>
              </div>
            </>
      }
    </>
  )
}

export default BookView