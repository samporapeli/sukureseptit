import React from 'react'

const Comment = ({ authorName, commentContent }) => {
  return (
    <>
      <p>Comment</p>
      <ul>
        <li>{commentContent}</li>
        <li>{authorName}</li>
      </ul>
      
    </>
  )
}

export default Comment