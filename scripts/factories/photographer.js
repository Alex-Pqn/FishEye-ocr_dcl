function photographerFactory (data) {
  const { id, name, portrait, country, city, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM () {
    const cardTemplate =
      `
      <article>
        <a href="photographer.html?&id=${id}">
          <img src="${picture}" title="${name}" alt="">
          <h2>${name}</h2>
        </a>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <p>${price}€/jour</p>
      </article>
      `;
    return (cardTemplate);
  }
  return { name, picture, getUserCardDOM };
}
