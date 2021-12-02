import React, { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'
import Comment from './Comment'
import Recipe from './Recipe'
import InputRecipe from './InputRecipe'

const LinssikeittoIngredients = [
  {amount: 2, name:"sipuli"},
  {amount: "pari", unit:"rkl", name:"suola"},
  {amount: 1, unit:"tlk", name:"chilitomaattimurskaa"}
]

const LinssikeittoInstructions = "Huuhdo linssit. Kuullota sipulit öljyssä kattilan pohjalla. Lisää vesi ja tomaattimurskat. Anna kiehua hetken ajan ja lisää linssit. Anna kiehua noin puoli tuntia ja lisää kerma. Anna vielä hautua 5-10 minuuttia ennen tarjoilua."

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
                      <InputRecipe />
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