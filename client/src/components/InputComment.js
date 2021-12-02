import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'


const InputComment = () => {
  const params = useParams()
  console.log(params.bookID)
  console.log(params.recipeID)
  const [commentData, setCommentData] = useState(
    {
      comment: '',
    }
  )

  const addComment = async (event) => {
    event.preventDefault()
    try{
      const res = await recipeService.addComment(commentData, params.recipeID, params.bookID)
      console.log(res)
    } catch (e) {
      alert(e)
    }
  }

  const handleInputChange = (event, key) => {
    console.log(event.target.value)
    const newState = {...commentData}
    newState[key] = event.target.value
    setCommentData(newState)
  }

  return (
    <>
      <h3>Lisää uusi kommentti</h3>
      <form onSubmit={addComment}>
        <label>
          Kommentin sisältö:   
        </label>
        <br />
        <input
          type='text'
          value={commentData.familyName}
          onChange={(event) => handleInputChange(event, "comment")}
          placeholder='Oi miten maukas'
          />
          <br/>
        <button className='btn btn-green' type="submit">Tallenna kommenttisi</button>
      </form> 
    </>
  )
}

export default InputComment