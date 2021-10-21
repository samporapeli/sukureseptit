import React, { useEffect, useState } from 'react'
import recipeService from '../services/recipeService'

const SideNav = () => {
  const [ recipes, setRecipes ] = useState(null)
  useEffect(async () => {
    const res = await recipeService.recipes()
    setRecipes(res.data)
  }, [])
  return (
    <>
      <p>SideNav</p>
      {
        recipes
          ? <ul>{ recipes.books.map(book => <li>{ book.name }</li>) }</ul>
          : 'Loading...'
      }
    </>
  )
}

export default SideNav