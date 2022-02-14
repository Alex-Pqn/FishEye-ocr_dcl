
/**
 * Photographer template
 * @param {Object} newPhotographer
 * @param {number} newPhotographer._id
 * @param {string} newPhotographer._name
 * @param {string} newPhotographer._tagline
 * @param {number} newPhotographer._price
 * @param {string} newPhotographer.location
 * @param {string} newPhotographer.pictureUrl
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
