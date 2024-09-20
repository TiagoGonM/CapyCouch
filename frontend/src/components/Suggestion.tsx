import React from 'react'

export const Suggestion = () => {
  return (
    <article className='border-white border-2 w-[15rem]'>
      <section>
        <img className="w-full" src="https://via.placeholder.com/250x250" alt="Media image" />
      </section>
      <section>
        <h1>Nombre de la pelicula/serie</h1>
        <p>Tags/generos o subgeneros</p>
        <p>Descripcion</p>
        <p>Disponible en:</p>
      </section>
    </article>
  )
}