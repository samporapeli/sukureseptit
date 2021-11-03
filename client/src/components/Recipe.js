import React from 'react'

const Recipe = ({ originalAuthor, mealType, name, portions, cookingTime, ingredients, instructions }) => {
  return (
    <>
      <div className="RecipePage">
        <p>{originalAuthor} · {mealType}</p>
        <h2>{name}</h2>
        <p>{portions} portions</p>
        <p>Cooking time: {cookingTime}</p>
        <ul>{ingredients.map(({amount, name, unit}) => (
          <li key={name}>{amount} {unit} {name}</li>
        ))}</ul>
        <p>{instructions}</p>
      </div>
    </>
  )
}

export default Recipe