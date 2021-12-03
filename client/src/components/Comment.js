import React from 'react'

const Comment = ({ authorName, commentContent }) => {
  return (
    <>
      <div className="kommentti">
        <p>{commentContent}</p>
        <p className="mt-4">- {authorName}</p>
      </div>
    </>
  )
}

export default Comment