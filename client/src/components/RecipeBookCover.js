import React from 'react'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes }) => {
  return (
    <>
      <div class="recipe-book-cover">
        <h2>{ recipes.books[0].name }</h2>
      </div>
      <h3>Näytä reseptit käyttäjän mukaan</h3>
      <ul>
        <li>Kaisa Rautiainen</li>
        <li>Helena Rautiainen</li>
        <li>Anton Rautiainen</li>
      </ul>
      <button onClick={ () => alert('not yet implemented') }>
        Kopioi rekisteröitymislinkki
      </button>
      <p>Salaisen rekisteröitymilinkin kautta liittymällä sukulaisesi saavat oikeuden tarkastella { recipes.books[0].name }a ja lisätä omia reseptejään.</p>
    </>
  )
}

export default RecipeBookCover