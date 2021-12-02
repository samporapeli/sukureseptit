import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'


const InputComment = ({ setCommentTrigger }) => {
  const params = useParams()
  console.log(params.bookID)
  console.log(params.recipeID)
  const [commentData, setCommentData] = useState('')

  const addComment = async (event) => {
    event.preventDefault()
    try{
      const res = await recipeService.addComment(commentData, params.recipeID, params.bookID)
      setCommentTrigger(true)
      setCommentData('')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <>
      <form onSubmit={addComment}>
        <label>
          Kommentoi:
        </label>
        <br />
        <input
          type='text'
          value={commentData}
          onChange={ (event) => {setCommentData(event.target.value); setCommentTrigger(false)} }
          placeholder='Oi miten maukas'
          />
          <br/>
        <button className='btn btn-green' type="submit">Tallenna kommenttisi</button>
      </form> 
    </>
  )
}

export default InputComment