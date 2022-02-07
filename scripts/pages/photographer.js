
function displayPhotographers (photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  const isTherePhotographers = () => photographers.length >= 1;

  if (isTherePhotographers()) {
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
