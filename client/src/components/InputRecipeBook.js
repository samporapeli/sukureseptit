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
      <h3 className="mt-10 mb-4">Lisää uusi reseptikirja tästä</h3>
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
      { created ? <Navigate to={`/kirja/${created}`} /> : <></>}
    </>
  )
}

export default InputRecipeBook