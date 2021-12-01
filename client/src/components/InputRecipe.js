import React, { useState } from 'react'
import recipeService from '../services/recipeService'


const InputRecipe = () => {

  const [recipeData, setRecipeData] = useState(
    {
      name: '',
      mealType: '',
      portions: '',
      cookingTime: '',
      instructions: '',
    }
  )

  const addRecipe = (event) => {
    event.preventDefault()
    recipeService.addRecipe(recipeData)
  }

  const handleInputChange = (event, key) => {
    console.log(event.target.value)
    const newState = {...recipeData}
    newState[key] = event.target.value
    setRecipeData(newState)
  }

  return (
    <>
      <h3>Lisää uusi resepti tästä</h3>
      <form onSubmit={addRecipe}>
        <div>
          <h4>Perustiedot</h4>
          <label> Reseptin nimi: </label>  
          <input
            type='text'
            value={recipeData.name}
            onChange={(event) => handleInputChange(event, "name")}
            placeholder='Helenan halloumihummus'
          />
          <br/>
          <label> Ruokalaji: </label>
          <input
            type='text'
            value={recipeData.mealType}
            onChange={(event) => handleInputChange(event, "mealType")}
            placeholder="esim. keitto"
          />
          <br />
          <label> Annoksia: </label>
          <input
            type='number'
            value={recipeData.portions}
            onChange={(event) => handleInputChange(event, "portions")}
            placeholder="esim. 3"
          />
          <br />
          <label> Valmistusaika minuutteina: </label>
          <input
            type='number'
            value={recipeData.cookingTime}
            onChange={(event) => handleInputChange(event, "cookingTime")}
            placeholder="esim. 30"
          />
          <br />
        </div>
        <div>
          <h4>Ainesosat</h4>
          <label> Määrä ja ainesosa: </label>
          <input
            type='text'
            placeholder="1rkl mustapippuria"
          />
          <br />
          <label> Määrä: </label>
          <input
            type='number'
            placeholder="2"
          />
          <label> yksikkö: </label>
          <input
            type='text'
            placeholder="rkl"
          />
          <label> ainesosa: </label>
          <input
            type='text'
            placeholder="mustapippuria"
          />
        </div>
        <div>
          <h4>Ohjeet</h4>
          <textarea value={recipeData.instructions}
            onChange={(event) => handleInputChange(event, "instructions")}
            placeholder="Kerro mitä välivaiheita reseptin käyttämiseen kuuluu"></textarea>
        </div>
        <button className="btn btn-green" type="submit">tallenna resepti</button>
      </form> 
    </>
  )
}

export default InputRecipe