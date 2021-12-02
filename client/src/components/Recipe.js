import React from 'react'

const Recipe = ({ recipe }) => {
  return (
    <>
      <div className="RecipePage">
        <p>{recipe.user} · {recipe.mealType}</p>
        <h2>{recipe.name}</h2>
        <p>{recipe.portions} annosta</p>
        <p>Valmistusaika: {recipe.cookingTime}</p>
        <h3>Ainesosat</h3>
        <ul>{recipe.Ingredients.map(({amount, name, unit}) => (
          <li key={name}>{amount} {unit} {name}</li>
        ))}</ul>
        <h3>Valmistusohjeet</h3>
        <p>{recipe.instructions}</p>
        <h3>Kommentit</h3>
        <p>TODO: comments</p>
      </div>
    </>
  )
}

export default Recipe