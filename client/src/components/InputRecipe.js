import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import recipeService from '../services/recipeService'


const InputRecipe = () => {
  const params = useParams()

  const [recipeData, setRecipeData] = useState(
    {
      name: '',
      mealType: '',
      portions: '',
      cookingTime: '',
      instructions: '',
    }
  )

  const [ingredientList, setIngredientList] = useState(
    [
      // {
      //   amount: '',
      //   unit: '',
      //   name: '',
      // }
    ]
  )

  const [ingredient, setIngredient] = useState({
    amount: '',
    unit: '',
    name: '',
  })

  const [recipeUrl, setRecipeUrl] = useState(
    ''
  )

  const handleIngredientInputChange = (event, key) => {
    console.log(event.target.value)
    const newState = {...ingredient}
    newState[key] = event.target.value
    setIngredient(newState)
  }

  const addIngredient = (event) => {
    event.preventDefault()
    const newState = [...ingredientList]
    newState.push(ingredient)
    setIngredientList(newState)
    setIngredient({
      amount: '',
      unit: '',
      name: '',
    })
  }

  const addRecipe = async (event) => {
    event.preventDefault()
    try{
        const fullRecipeData = {...recipeData}
        fullRecipeData.ingredients = ingredientList
        
        const res = await recipeService.addRecipe(params.bookID, fullRecipeData)
        console.log(res)
        setRecipeUrl(`/kirja/${params.bookID}/resepti/${res.data.created.id}`)
        // <Navigate to={`/kirja/${params.bookID}/resepti/${res.data.created.id}`}/>
      } catch (e) {
        alert(e)
      }
    

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
          {ingredientList ? ingredientList.map( ingredient => { return (
                <p>{ingredient.amount} {ingredient.unit} {ingredient.name}</p>
                )})
                :
                <></>}
          <label> Määrä: </label>
          <input
            type='number'
            placeholder="2"
            value={ingredient.amount}
            onChange={(event) => handleIngredientInputChange(event, "amount")}
          />
          <label> yksikkö: </label>
          <input
            type='text'
            placeholder="rkl"
            value={ingredient.unit}
            onChange={(event) => handleIngredientInputChange(event, "unit")}
          />
          <label> ainesosa: </label>
          <input
            type='text'
            placeholder="mustapippuria"
            value={ingredient.name}
            onChange={(event) => handleIngredientInputChange(event, "name")}
          />
          <button onClick={addIngredient} className="btn btn-green"> Lisää ainesosa</button>
        </div>
        <div>
          <h4>Ohjeet</h4>
          <textarea value={recipeData.instructions}
            onChange={(event) => handleInputChange(event, "instructions")}
            placeholder="Kerro mitä välivaiheita reseptin käyttämiseen kuuluu"></textarea>
        </div>
        <button className="btn btn-green" type="submit">tallenna resepti</button>
      </form>
      {recipeUrl ? <Navigate to={recipeUrl}/> : <></> }
    </>
  )
}

export default InputRecipe