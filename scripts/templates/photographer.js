
/**
 * Photographer template
 * @param {_id: number, _name: string, _tagline: string, _price: number, location: string, pictureUrl: string} newPhotographer
 */
function photographerTemplate (newPhotographer) {
  const { _id, _name, _tagline, _price, location, pictureUrl } = newPhotographer;

  const cardTemplate =
  `
  <article>
    <a href="photographer.html?&id=${_id}">
      <img src="${pictureUrl}" title="${_name}" alt="">
      <h2>
        ${_name}
      </h2>
    </a>
    <p>
      ${location}
    </p>
    <p>
      ${_tagline}
    </p>
    <p>
      ${_price}€/jour
    </p>
  </article>
  `;

  return cardTemplate;
}
