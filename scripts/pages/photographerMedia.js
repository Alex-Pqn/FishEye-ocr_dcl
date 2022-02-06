let photographer = {};

const urlParams = new URLSearchParams(window.location.search);
const userId = +urlParams.get('id');

function photographerNotFound () {
  const mainElement = document.getElementById('main')
  const mediasSectionElement = document.querySelector('.photograph-medias_section');
  const infosSectionElement = document.querySelector('.photograph-infos');
  const headerSectionElement = document.querySelector('.photograph-header');
  const filterSectionElement = document.querySelector('.photograph-medias-filters');
  
  mediasSectionElement.style.display = 'none'
  infosSectionElement.style.display = 'none'
  headerSectionElement.style.display = 'none'
  filterSectionElement.style.display = 'none'
  
  mainElement.insertAdjacentHTML('beforeend', `<p>La page de ce photographe n'existe pas ou a été supprimée.</p>`)
}

// display photographer details
function displayPhotographerHeader () {
  const headerNameElement = document.querySelector('#photograph-name');
  const headerCityElement = document.querySelector('#photograph-city');
  const headerTaglineElement = document.querySelector('#photograph-tagline');
  const headerImgElement = document.querySelector('#photograph-img');
  const contactModalHeaderElement = document.querySelector('#contact_modal header h1 span');

  headerNameElement.textContent = photographer.name;
  contactModalHeaderElement.textContent = photographer.name;
  headerCityElement.textContent = `${photographer.city}, ${photographer.country}`;
  headerTaglineElement.textContent = photographer.tagline;
  headerImgElement.setAttribute('src', `assets/photographers/${photographer.portrait}`);
  headerImgElement.setAttribute('alt', photographer.name);
}

// display photographer infos
function displayPhotographerInfos () {
  const totalMediasLikes = () => photographer.medias.reduce((acc, curr) => acc + curr.likes, 0);

  const infosPriceElement = document.querySelector('#photograph-infos-price');
  const infosLikesElement = document.querySelector('#photograph-infos-likes');

  infosLikesElement.textContent = totalMediasLikes();
  infosPriceElement.textContent = photographer.price;
}

// display photographer medias
function displayPhotographerMedias () {
  const photographerMediasSection = document.querySelector('.photograph-medias_section');
  const isTherePhotographerMedias = () => photographer.medias.length >= 1
  
  // reset medias
  document.querySelectorAll('.photograph-media-item').forEach(media => media.remove());
  
  // push medias
  if (isTherePhotographerMedias()) {
    photographer.medias.forEach(media => {
      const newMedia = new Media(media.photographerId, media.id, media.title, media.video, media.image, media.likes)
  
      const photographerMediaCardDOM = photographerMediaTemplate(newMedia)
      photographerMediasSection.insertAdjacentHTML('beforeend', photographerMediaCardDOM);
    });
  }
  else photographerMediasSection.insertAdjacentHTML('beforeend', `<p>${photographer.name} n'a publié aucun média.</p>`)
}

// increment media like
// on like event
function incrementMediaLike (mediaLikedId) {
  photographer.medias.forEach(media => {
    if (media.id === mediaLikedId) {
      media.likes++;
      document.querySelector(`[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`).innerHTML = media.likes;

      displayPhotographerInfos();
    }
  });
}

async function init () {
  ({ photographers } = await getPhotographersData());
  
  photographers.forEach(photographerItem => {
    if (photographerItem.id === userId) photographer = photographerItem
  });

  if (!photographer) return photographerNotFound();

  filterChange();
  displayPhotographerHeader();
  displayPhotographerInfos();
};

// on filter change
function filterChange (option) {
  titleFilter = () => photographer.medias.sort((media1, media2) => {
    if (media1.title < media2.title) return -1;
    if (media1.title > media2.title) return 1;
    
    return 0;
  });
  dateFilter = () => photographer.medias.sort((media1, media2) => new Date(media1.date).getTime() - new Date(media2.date).getTime());
  popularityFilter = () => photographer.medias.sort((media1, media2) => media2.likes - media1.likes);

  switch (option) {
    case 'date':
      dateFilter();
      break;
    case 'title':
      titleFilter();
      break;
    default:
      popularityFilter();
  }

  displayPhotographerMedias();
}

init();
