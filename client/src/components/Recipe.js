import React from 'react'

const Recipe = ({ recipe }) => {
  return (
    <>
      <div className="RecipePage">
        <p>{recipe.user} · {recipe.mealType}</p>
        <h2>{recipe.name}</h2>
        <p>{recipe.portions} portions</p>
        <p>Cooking time: {recipe.cookingTime}</p>
        <ul>{recipe.Ingredients.map(({amount, name, unit}) => (
          <li key={name}>{amount} {unit} {name}</li>
        ))}</ul>
        <p>{recipe.instructions}</p>
      </div>
    </>
  )
}

export default Recipe