import React, { useEffect, useState } from 'react'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'
import Comment from './Comment'
import Recipe from './Recipe'

const LinssikeittoIngredients = [
  {amount: 2, name:"sipuli"},
  {amount: "pari", unit:"rkl", name:"suola"},
  {amount: 1, unit:"tlk", name:"chilitomaattimurskaa"}
]

const LinssikeittoInstructions = "Huuhdo linssit. Kuullota sipulit öljyssä kattilan pohjalla. Lisää vesi ja tomaattimurskat. Anna kiehua hetken ajan ja lisää linssit. Anna kiehua noin puoli tuntia ja lisää kerma. Anna vielä hautua 5-10 minuuttia ennen tarjoilua."

const LoggedInView = () => {
  const [ recipes, setRecipes ] = useState(null)
  const [ family, setFamily ] = useState(null)

  useEffect(async () => {
    const res = await recipeService.recipes()
    setRecipes(res.data)
  }, [])

  useEffect(async () => {
    setFamily((await recipeService.family()).data)
  }, [])

  return (
    
    <>
      <h1>Sukureseptit</h1>
      {
        ! recipes
          ? 'Loading...'
          :
            <>
              <SideNav recipes={recipes} />
              <RecipeBookCover recipes={recipes} family={family} />
              <Recipe originalAuthor="Sampo" mealType="Keitto" portions="4" cookingTime="50min" name="Sampon linssikeitto" ingredients={LinssikeittoIngredients} instructions={LinssikeittoInstructions} />
              <Comment authorName="Kalle" commentContent="Juujaa" />
            </>
      }
    </>
  )
}

export default LoggedInView