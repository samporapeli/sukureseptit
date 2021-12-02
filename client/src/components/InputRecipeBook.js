import React, { useState } from 'react'
import recipeService from '../services/recipeService'


const InputRecipeBook = () => {

  const [recipeBookData, setRecipeBookData] = useState(
    {
      familyName: '',
      description: ''
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
      <h3>Lisää uusi reseptikirja tästä</h3>
      <form onSubmit={addRecipeBook}>
        <div className="grid gap-4 grid-cols-none ml-4">
        <label>
          Reseptikirjan nimi:   
        </label>  
        <input
          className="p-4"
          type='text'
          value={recipeBookData.familyName}
          onChange={(event) => handleInputChange(event, "familyName")}
          placeholder='Rapelien Reseptit'
          />
          <label>
          Kirjan kuvaus:   
          </label>
          <input
          className="p-4"
          type='text'
          value={recipeBookData.description}
          onChange={(event) => handleInputChange(event, "description")}
          placeholder="Keitot ja kastikkeet "
          />
          <br />
          </div>
        <button className=" ml-4 btn text-black btn-green" type="submit">tallenna</button>
      </form> 
    </>
  )
}

export default InputRecipeBook