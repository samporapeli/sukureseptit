import React, { useEffect, useState } from 'react'
import recipeService from '../services/recipeService'
import RecipeBookCover from './RecipeBookCover'
import SideNav from './SideNav'
import Comment from './Comment'

const LoggedInView = () => {
  const [ recipes, setRecipes ] = useState(null)
  useEffect(async () => {
    const res = await recipeService.recipes()
    setRecipes(res.data)
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
              <RecipeBookCover recipes={recipes} />
              <Comment authorName="Kalle" commentContent="Juujaa" />
            </>
      }
    </>
  )
}

export default LoggedInView