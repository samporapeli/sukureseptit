import React from 'react'

const Comment = ({ authorName, commentContent }) => {
  return (
    <>
        <p>{authorName} kommentoi: {commentContent}</p>
    </>
  )
}

export default Comment