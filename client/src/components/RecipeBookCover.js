import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes, family, currentUser }) => {
  const params = useParams()

  return (
    <>
      <div className="col-span-2 border-8 border-ruskee text-white bg-ruskee rounded-lg flex-col text-center align-center">
        <h2 className=''>
          { recipes
            ? recipes.familyName
            : 'Ladataan...'
          }
        </h2>
        <h3 className=''>
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