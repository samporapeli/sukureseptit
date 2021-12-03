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
  const [ copying, setCopying ] = useState(false)

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

  const copyInviteLink = () => {
    try {
      setCopying(true)
      setTimeout(() => {
        const e = document.getElementById('copy-text-input')
        e.focus()
        e.select()
        if (document.execCommand('copy'))
          alert('Linkki kopioitu leikepöydälle!')
        else throw 'error'
      }, 100)
    } catch (e) {
      console.log(e)
      alert('Automaattinen kopiointi ei onnistunut. Kopioi osoitepalkin sisältö manuaalisesti!')
    }
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
              {/* <SideNav recipes={books} /> */}
              <div className='container font-Castoro px-10 pt-10 mx-auto'>
                <Routes>
                  <Route path='/*'>
                    <Route index element={
                      <>
                      <h2>{book.familyName}</h2>
                      <p>{book.description}</p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-1 max-w-md lg:max-w-none mt-8 mb-10">
                        {/* <RecipeBookCover recipes={book} family={family} currentUser={currentUser} /> */}
                        <div className="bg-sivu shadow-lg col-span-2 p-10">
                        <h3>Kirjan reseptit</h3>
                        { book
                          ? book.Recipes.length > 0
                            ?
                              <>
                                <input className="p-4" type='text' placeholder='hae reseptiä...' onChange={(event) => setSearchTerm(event.target.value.toLowerCase()) } />
                                <ul className="pt-4 list-disc list-inside">
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
                                        <li className="hover:underline" key={r.id}>
                                          {r.name}
                                        </li>
                                      </Link>))}
                                </ul>
                              </>
                            : <p>Kirjassa ei vielä ole reseptejä. <Link to={`/kirja/${params.bookID}/uusiresepti`}>Luo ensimmäinen klikkaamalla tästä.</Link></p>
                          : 'Ladataan...' 
                        }
                        </div>
                        <div className="bg-sivu mt-4 lg:mt-0 shadow-lg col-span-2 p-10">
                          <h4>Reseptikirjan jäsenet</h4>
                          <ul className='list-disc pt-4 px-6'>
                            {family
                            ? family.members.map(member =>
                              <li key={member.id + ' ' + member.lastName}>
                                { member.firstName } { member.lastName }
                              </li>
                            )
                            : <li>Ladataan...</li>}
                          </ul>
                          <button className=' mt-8 col-span-1 btn bg-vihree btn-green' onClick={ copyInviteLink }>
                          Kopioi rekisteröitymislinkki
                        </button>
                        <p className="mt-2 text-sm text-ruskee">Salaisen kirjalinkin kautta sukulaisesi saavat oikeuden tarkastella reseptikirjaa ja rekisteröitymisen jälkeen lisätä omia reseptejään.</p>
                        { copying ? <input id='copy-text-input' type='text' readOnly value={window.location.href}/>: <></>}
                        </div>
                        </div>
                        <div className=" col-span-1 mb-10"><Link to={`/kirja/${params.bookID}/uusiresepti`} className='btn bg-vihree btn-green p-4'>Lisää resepti tähän kirjaan</Link></div>
                        <div className="col-span-1 mb-10">
                        { currentUser && book && books && !books.map(b => b.id).includes(book.id)
                          ? <button className='btn btn-green' onClick={ joinToBook }>Liity suvun reseptikirjaan</button>
                          : <></>
                        } { currentUser ? <></> :
                          <button className=' btn btn-green'><Link to='/'>Rekisteröidy lisätäksesi reseptejä</Link></button>
                        }
                        </div>
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