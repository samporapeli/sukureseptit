import React from 'react'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes, family }) => {
  return (
    <>
      <div className="recipe-book-cover">
        <h2 className='flex items-center justify-center'>{ recipes ? recipes.books[0].familyName : 'Ladataan...' }</h2>
        <h3 className='flex items-center justify-center'>{ recipes ? recipes.books[0].description : 'Ladataan...' }</h3>
      </div>
      <h3>Näytä reseptit käyttäjän mukaan</h3>
      <ul className='list-disc px-6'>
        {family
        ? family.members.map(member =>
          <li key={member.firstName + ' ' + member.lastName}>
            { member.firstName } { member.lastName }
          </li>
        )
        : <li>Ladataan...</li>}
      </ul>
      <button className='btn btn-green' onClick={ () => alert('not yet implemented') }>
        Kopioi rekisteröitymislinkki
      </button>
      <p>Salaisen rekisteröitymilinkin kautta liittymällä sukulaisesi saavat oikeuden tarkastella { recipes ? recipes.books[0].name : 'reseptikirja'}a ja lisätä omia reseptejään.</p>
    </>
  )
}

export default RecipeBookCover