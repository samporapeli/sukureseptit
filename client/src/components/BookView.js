import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'

const BookView = ({ currentUser }) => {
  const params = useParams()
  const [ recipes, setRecipes ] = useState(null)
  const [ family, setFamily ] = useState(null)

  useEffect(async () => {
    const res = await recipeService.recipes()
    setRecipes(res.data)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await recipeService.family()
      setFamily(res.data)
    }
    fetchData()
  }, [])

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
        ! recipes
          ? 'Loading...'
          :
            <>
              <SideNav recipes={recipes} />
              <div className='container font-Castoro px-10 mx-auto'>
                <Routes>
                  <Route path='/*'>
                    <Route index element={
                      <>
                        <RecipeBookCover recipes={recipes} family={family} currentUser={currentUser} />
                        { recipes
                          ? <ul>
                              {recipes.books.find(b => b.id === params.bookID).Recipes.map(r => (
                                <Link to={`/kirja/${params.bookID}/resepti/${r.id}`}>
                                  <li key={r.id}>
                                    {r.name}
                                  </li>
                                </Link>))}
                            </ul>
                          : 'Ladataan...'
                        }
                        <h3>Näytä reseptit käyttäjän mukaan</h3>
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
                        { currentUser && recipes && !recipes.books.map(b => b.id).includes(params.bookID)
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