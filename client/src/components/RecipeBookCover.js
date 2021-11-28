import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/RecipeBookCover.scss'

const RecipeBookCover = ({ recipes, family }) => {
  const params = useParams()

  const copyInviteLink = async () => {
    if (navigator.cliboard) {
      await navigator.clipboard.writeText(window.location.href)
      alert('Linkki kopioitu leikepöydälle!')
    }
    else
      alert('Selaimesi ei tue automaattista kopiointia. Kopioi osoitepalkin sisältö manuaalisesti!')
  }

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
      <h3>Näytä reseptit käyttäjän mukaan</h3>
      <ul className='list-disc px-6'>
        {family
        ? family.members.map(member =>
          <li key={member.id + ' ' + member.lastName}>
            { member.firstName } { member.lastName }
          </li>
        )
        : <li>Ladataan...</li>}
      </ul>
      <button className='btn btn-green' onClick={ copyInviteLink }>
        Kopioi rekisteröitymislinkki
      </button>
      <p>Salaisen kirjalinkin kautta sukulaisesi saavat oikeuden tarkastella reseptikirjaa ja rekisteröitymisen jälkeen lisätä omia reseptejään.</p>
    </>
  )
}

export default RecipeBookCover