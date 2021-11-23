import React, { useState } from 'react'
import recipeService from '../services/recipeService'


const InputRecipeBook = () => {

  const [recipeBookData, setRecipeBookData] = useState(
    {
      familyName: 'Suvun nimi',
      description: 'Kirjan kuvaus'
    }
  )

  const addRecipeBook = (event) => {
    event.preventDefault()
    recipeService.addRecipeBook(recipeBookData)
  }

  const handleInputChange = (event, key) => {
    console.log(event.target.value)
    const newState = {...recipeBookData}
    newState[key] = event.target.value
    setRecipeBookData(newState)
  }

  return (
    <>
      <p>InputRecipeBook</p>
      <form onSubmit={addRecipeBook}>
        <input
          value={recipeBookData.familyName}
          onChange={(event) => handleInputChange(event, "familyName")}
          />
          <input
          value={recipeBookData.description}
          onChange={(event) => handleInputChange(event, "description")}
          />
        <button type="submit">tallenna</button>
      </form> 
    </>
  )
}

export default InputRecipeBook