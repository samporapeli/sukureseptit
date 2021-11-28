import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'

const BookView = () => {
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

  return (
    
    <>
      {
        ! recipes
          ? 'Loading...'
          :
            <>
              <SideNav recipes={recipes} />
              <div className='container px-10 mx-auto'>
                <Routes>
                  <Route path='/*'>
                    <Route index element={
                      <>
                        <RecipeBookCover recipes={recipes} family={family} />
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