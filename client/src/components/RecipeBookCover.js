import React from 'react'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes, family }) => {
  return (
    <>
      <div className="recipe-book-cover">
        <h2>{ recipes ? recipes.books[0].name : 'Ladataan...' }</h2>
      </div>
      <h3>Näytä reseptit käyttäjän mukaan</h3>
      <ul>
        {family
        ? family.members.map(member =>
          <li key={member.firstName + ' ' + member.lastName}>
            { member.firstName } { member.lastName }
          </li>
        )
        : <li>Ladataan...</li>}
      </ul>
      <button onClick={ () => alert('not yet implemented') }>
        Kopioi rekisteröitymislinkki
      </button>
      <p>Salaisen rekisteröitymilinkin kautta liittymällä sukulaisesi saavat oikeuden tarkastella { recipes ? recipes.books[0].name : 'reseptikirja'}a ja lisätä omia reseptejään.</p>
    </>
  )
}

export default RecipeBookCover