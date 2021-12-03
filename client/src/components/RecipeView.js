import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'
import Comment from './Comment'
import Recipe from './Recipe'
import InputRecipeBook from './InputRecipeBook'
import InputComment from './InputComment'

const RecipeView = ({ currentUser }) => {
  const params = useParams()
  const [ recipe, setRecipe ] = useState(null)
  const [ commentTrigger, setCommentTrigger ] = useState(false)

  useEffect(async () => {
    const res = await recipeService.recipe(params.bookID, params.recipeID)
    setRecipe(res.data.recipe)
  }, [commentTrigger])

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
                    <div className="container font-Castoro">
                      <Recipe recipe={recipe} />
                      <br/>
                      <h4>Kommentit</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      { recipe.RecipeComments
                        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                        .map(c =>
                          <Comment key={c.id} authorName={c.User.firstName} commentContent={c.comment} />
                        )
                      }
                      </div>
                      <InputComment setCommentTrigger={setCommentTrigger} currentUser={currentUser} />
                    </div>
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