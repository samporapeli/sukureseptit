import React from 'react'

const Comment = ({ authorName, commentContent }) => {
  return (
    <>
      <div className="kommentti">
        <p>{authorName} kommentoi:</p>
        <p>{commentContent}</p>
      </div>
    </>
  )
}

export default Comment