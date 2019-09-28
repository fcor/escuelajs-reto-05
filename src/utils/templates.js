export const cardTemplate = character => `
  <article class="Card">
    <img src="${character.image}" />
    <h2>${character.name}<span>${character.species}</span></h2>
  </article>
  `

export const endTemplate = () => `<p>Ya no hay mas personajes!</p>`

export const errorTemplate = () => `<p>Ocurrió un error :(</p>`