let tabindex = 0

/**
 * Photographer template
 * @param {_id: number, _name: string, _tagline: string, _price: number, location: string, pictureUrl: string} newPhotographer
 */
// eslint-disable-next-line no-unused-vars
function photographerTemplate(newPhotographer) {
  const { _id, _name, _tagline, _price, location, pictureUrl } = newPhotographer

  tabindex += 10

  const cardTemplate = `
  <article>
    <a tabindex="${tabindex}" href="photographer.html?id=${_id}">
      <img src="${pictureUrl}" title="${_name}" alt="">
      <h2>
        ${_name}
      </h2>
    </a>
    <div tabindex="${tabindex + 1}">
      <p>
        <span> ${location} </span>
      </p>
      <p>
        ${_tagline}
      </p>
      <p>
        ${_price}€/jour
      </p>
    </div>
  </article>
  `

  return cardTemplate
}
