import React from 'react'

const Recipe = ({ recipe }) => {
  return (
    <>
      <div className="RecipePage grid grid-cols-2 gap-1 mt-10">
        <div className="bg-sivu shadow-lg col-span-2 lg:col-span-1 max-w-md lg:max-w-none p-10">
        <h2>{recipe.name}</h2>
        <p>Ruokalaji: {recipe.mealType}</p>
        <p>{recipe.portions} annosta</p>
        <p>Valmistusaika: {recipe.cookingTime} minuuttia</p>
        <h3 className="mt-4">Ainesosat</h3>
        <ul className="list-disc list-inside">{recipe.Ingredients.map(({amount, name, unit}) => (
          <li key={name}>{amount} {unit} {name}</li>
        ))}</ul>
        </div>
        <div className="bg-sivu mt-1 lg:mt-0 shadow-lg col-span-2 max-w-md lg:max-w-none lg:col-span-1 p-10">
        <h3>Valmistusohjeet</h3>
        <p>{recipe.instructions}</p>
        </div>
      </div>
    </>
  )
}

export default Recipe