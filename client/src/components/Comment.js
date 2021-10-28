import React from 'react'

const Comment = ({ authorName, commentContent }) => {
  return (
    <>
      <p>Comment</p>
      <p>{commentContent}</p>
      <p>{authorName}</p>
    </>
  )
}

export default Comment