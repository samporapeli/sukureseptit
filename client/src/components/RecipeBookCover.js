import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes, family, currentUser }) => {
  const params = useParams()

  return (
    <>
      <div className="recipe-book-cover">
        <h2 className='flex items-center justify-center'>
          { recipes
            ? recipes.familyName
            : 'Ladataan...'
          }
        </h2>
        <h3 className='flex items-center justify-center'>
          { recipes
            ? recipes.description
            : 'Ladataan...'
          }
        </h3>
      </div>
    </>
  )
}

export default RecipeBookCover