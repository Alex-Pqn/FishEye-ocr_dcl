
/**
 * Display photographers
 * @param {Array} photographers
 */
function displayPhotographers (photographers) {
  const photographersSection = document.querySelector('.photographers_section');
  const isTherePhotographers = () => photographers.length >= 1;

  if (isTherePhotographers()) {
    /**
     * Create a new photographer
     * @param {Object} photographer
     * @param {number} photographer.id
     * @param {string} photographer.name
     * @param {string} photographer.portrait
     * @param {string} photographer.country
     * @param {string} photographer.city
     * @param {string} photographer.tagline
     * @param {number} photographer.price
     * @param {string} newPhotographer.pictureUrl
     */
    photographers.forEach(async photographer => {
      const newPhotographer = new Photographer(photographer.id, photographer.name, photographer.portrait, photographer.country, photographer.city, photographer.tagline, photographer.price);
      
      fetch(newPhotographer.pictureUrl)
      .then(result => {
        if (result.ok) {
          const photographerCardDOM = photographerTemplate(newPhotographer);
          photographersSection.insertAdjacentHTML('beforeend', photographerCardDOM);
        }
      })
      .catch(err => console.error(err))
    });
  } else photographersSection.insertAdjacentHTML('beforeend', '<p>Aucun photographe n\'a été trouvé.</p>');
};

async function init () {
  ({ photographers } = await getPhotographersData());

  displayPhotographers(photographers);
};

init();
