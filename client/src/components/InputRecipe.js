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
      <h3 className="mt-4">Lisää uusi resepti tästä</h3>
      <form onSubmit={addRecipe}>
        <div className="grid grid-cols-2 gap-1 mt-4">
        <div className="bg-sivu shadow-lg col-span-2 lg:col-span-1 max-w-md lg:max-w-none p-10">
          <h4 className="mb-2 text-4xl">Perustiedot</h4>
          <label> Reseptin nimi: </label>  
          <input
            className="p-4 mt-2 mb-2 min-w-full"
            type='text'
            value={recipeData.name}
            onChange={(event) => handleInputChange(event, "name")}
            placeholder='Helenan halloumihummus'
          />
          <br/>
          <label> Ruokalaji: </label>
          <input
            className="p-4 mt-2 mb-2 min-w-full"
            type='text'
            value={recipeData.mealType}
            onChange={(event) => handleInputChange(event, "mealType")}
            placeholder="esim. keitto"
          />
          <br />
          <label> Annoksia: </label>
          <input
            className="p-4 mt-2 mb-2 min-w-full"
            type='number'
            value={recipeData.portions}
            onChange={(event) => handleInputChange(event, "portions")}
            placeholder="esim. 3"
          />
          <br />
          <label> Valmistusaika minuutteina: </label>
          <input
          className="p-4 mt-2 min-w-full"
            type='number'
            value={recipeData.cookingTime}
            onChange={(event) => handleInputChange(event, "cookingTime")}
            placeholder="esim. 30"
          />
          <br />
          <h4 className="mt-10">Lisää ainesosat yksitellen</h4>
          {ingredientList ? ingredientList.map( ingredient => { return (
                <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                )})
                :
                <></>}
          <input
            className="p-4 mt-2"
            type='number'
            placeholder="2"
            value={ingredient.amount}
            onChange={(event) => handleIngredientInputChange(event, "amount")}
          />
          <input
          className="p-4 mt-2 lg:ml-2"
            type='text'
            placeholder="rkl"
            value={ingredient.unit}
            onChange={(event) => handleIngredientInputChange(event, "unit")}
          />
          <input
            className="p-4 mt-2 min-w-full"
            type='text'
            placeholder="mustapippuria"
            value={ingredient.name}
            onChange={(event) => handleIngredientInputChange(event, "name")}
          />
          <button onClick={addIngredient} className="mt-2 btn bg-vihree btn-green"> Lisää ainesosa</button>
        </div>
        <div className="bg-sivu shadow-lg col-span-2 lg:col-span-1 max-w-md lg:max-w-none p-10">
          <h4>Ohjeet</h4>
          <textarea
            className="p-4 mt-2 min-w-full lg:h-3/4 h-96"
            value={recipeData.instructions}
            onChange={(event) => handleInputChange(event, "instructions")}
            placeholder="Kerro mitä välivaiheita reseptin käyttämiseen kuuluu"></textarea>
        </div>
        </div>
        <button className="py-4 btn btn-green mt-4 mb-4" type="submit">Tallenna resepti ja lisää se reseptikirjaan</button>
      </form>
      {recipeUrl ? <Navigate to={recipeUrl}/> : <></> }
    </>
  )
}

export default InputRecipe