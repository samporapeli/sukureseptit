import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'
import Comment from './Comment'
import Recipe from './Recipe'

const RecipeView = () => {
  const params = useParams()
  const [ recipe, setRecipe ] = useState(null)

  useEffect(async () => {
    const res = await recipeService.recipe(params.bookID, params.recipeID)
    await setRecipe(res.data.recipe)
  }, [])

  return (
    <>
      {
        ! recipe
          ? 'Loading...'
          :
            <>
              <Routes>
                <Route path=''>
                  <Route index element={
                    <>
                      <Recipe recipe={recipe} />
                      <br/>
                      <Comment authorName="Kalle" commentContent="Juujaa" />
                    </>
                  } />
                  <Route path='edit' element={<h1>TODO: edit view</h1>} />
            </Route>
              </Routes>
            </>
      }
    </>
  )
}

export default RecipeView