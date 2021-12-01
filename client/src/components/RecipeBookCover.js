import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes, family, currentUser }) => {
  const params = useParams()

  return (
    <>
      <div className="recipe-book-cover">
        <h2 className='flex items-center justify-center'>
          { recipes
            ? recipes.books.find(b => b.id === params.bookID).familyName
            : 'Ladataan...'
          }
        </h2>
        <h3 className='flex items-center justify-center'>
          { recipes
            ? recipes.books.find(b => b.id === params.bookID).description
            : 'Ladataan...'
          }
        </h3>
      </div>
    </>
  )
}

export default RecipeBookCover