import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import recipeService from '../services/recipeService'


const InputRecipeBook = () => {

  const [recipeBookData, setRecipeBookData] = useState(
    {
      familyName: '',
      description: ''
    }
  )
  const [ created, setCreated ] = useState('')

  const addRecipeBook = async (event) => {
    event.preventDefault()
    try {
      const res = await recipeService.addRecipeBook(recipeBookData)
      setCreated(res.data.newBook.id)
    } catch (e) {
      alert(e)
    }
  }

  const handleInputChange = (event, key) => {
    const newState = {...recipeBookData}
    newState[key] = event.target.value
    setRecipeBookData(newState)
  }

  return (
    <>
      <h3>Lisää uusi reseptikirja tästä</h3>
      <form onSubmit={addRecipeBook}>
        <label>
          Reseptikirjan nimi:   
        </label>  
        <input
          type='text'
          value={recipeBookData.familyName}
          onChange={(event) => handleInputChange(event, "familyName")}
          placeholder='Rapelien Reseptit'
          />
          <br/>
          <label>
          Kirjan kuvaus:   
          </label>
          <input
          type='text'
          value={recipeBookData.description}
          onChange={(event) => handleInputChange(event, "description")}
          placeholder="Keitot ja kastikkeet "
          />
          <br />
        <button type="submit">tallenna</button>
      </form> 
      { created ? <Navigate to={`/kirja/${created}`} /> : <></>}
    </>
  )
}

export default InputRecipeBook