import React, { useEffect, useState } from 'react'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'

const LoggedInView = () => {
  const [ recipes, setRecipes ] = useState(null)
  useEffect(async () => {
    const res = await recipeService.recipes()
    setRecipes(res.data)
  }, [])

  return (
    <>
      <h1>Sukureseptit</h1>
      <SideNav recipes={recipes} />
      <RecipeBookCover recipes={recipes} />
    </>
  )
}

export default LoggedInView