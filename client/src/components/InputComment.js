import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import recipeService from '../services/recipeService'


const InputComment = ({ setCommentTrigger, currentUser }) => {
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

  if (currentUser) return (
    <>
      <form 
      className="mt-4"
      onSubmit={addComment}>
        <label>
          Lisää uusi kommentti:
        </label>
        <br />
        <input
          className="p-4 mt-2 w-1/2"
          type='text'
          value={commentData}
          onChange={ (event) => {setCommentData(event.target.value); setCommentTrigger(false)} }
          placeholder='Oi miten maukas'
          />
          <br/>
        <button className='mt-2 mb-4 btn btn-green' type="submit">Tallenna kommenttisi</button>
      </form> 
    </>
  )
  else return(<></>)
}

export default InputComment