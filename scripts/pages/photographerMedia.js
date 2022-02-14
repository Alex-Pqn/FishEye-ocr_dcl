let photographer = {};

const urlParams = new URLSearchParams(window.location.search);
const userId = +urlParams.get('id');

/**
 * Photographer not found
 * Displayed when no photographer has been found
 */
function photographerNotFound () {
  const mainElement = document.getElementById('main');
  const mediasSectionElement = document.querySelector('.photograph-medias_section');
  const infosSectionElement = document.querySelector('.photograph-infos');
  const headerSectionElement = document.querySelector('.photograph-header');
  const filterSectionElement = document.querySelector('.photograph-medias-filters');

  mediasSectionElement.style.display = 'none';
  infosSectionElement.style.display = 'none';
  headerSectionElement.style.display = 'none';
  filterSectionElement.style.display = 'none';

  mainElement.insertAdjacentHTML('beforeend', '<p>La page de ce photographe n\'existe pas ou a été supprimée.</p>');
}

/**
 * Display photographer details
 * @param {Object} photographer
 * @param {string} photographer.name
 * @param {string} photographer.portrait
 * @param {string} photographer.city
 * @param {string} photographer.country
 * @param {string} photographer.tagline
 */
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

/**
 * Display photographer infos
 * @param {Object} photographer
 * @param {number} photographer.price
 * @param {Array}  photographer.medias
 */
function displayPhotographerInfos () {
  const totalMediasLikes = () => photographer.medias.reduce((acc, curr) => acc + curr.likes, 0);

  const infosPriceElement = document.querySelector('#photograph-infos-price');
  const infosLikesElement = document.querySelector('#photograph-infos-likes');

  infosLikesElement.textContent = totalMediasLikes();
  infosPriceElement.textContent = photographer.price;
}

/**
 * Display photographer medias
 * @param {Object} photographer
 * @param {Array}  photographer.medias
 * @param {string} photographer.name
 */
function displayPhotographerMedias () {
  const photographerMediasSection = document.querySelector('.photograph-medias_section');
  const isTherePhotographerMedias = () => photographer.medias.length >= 1;

  // reset medias
  document.querySelectorAll('.photograph-media-item').forEach(media => media.remove());

  // push medias
  if (isTherePhotographerMedias()) {
    /**
     * Create a new photographer media
     * @param {Object} media
     * @param {string} newMedia.mediaUrl
     */
    photographer.medias.forEach(async media => {
      const newMedia = new PhotographerMediaFactory(media);

      fetch(newMedia.mediaUrl)
      .then(result => {
        if (result.ok) {
          const photographerMediaCardDOM = photographerMediaTemplate(newMedia);
          photographerMediasSection.insertAdjacentHTML('beforeend', photographerMediaCardDOM); 
        }
      })
      .catch(err => console.error(err))
    });
  } else photographerMediasSection.insertAdjacentHTML('beforeend', `<p>${photographer.name} n'a publié aucun média.</p>`);
}

/**
 * Increment media like (event)
 * @param {Array}  photographer.medias
 * @param {number} mediaLikedId
 */
function incrementMediaLike (mediaLikedId) {
  /**
   * Increment media like
   * @param {Object} media
   * @param {number} media.id
   * @param {number} media.likes
   */
  photographer.medias.forEach(media => {
    if (media.id === mediaLikedId) {
      media.likes++;
      document.querySelector(`[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`).innerHTML = media.likes;

      displayPhotographerInfos();
    }
  });
}

/**
 * Init
 * @param {Array} photographers
 * @param {Object} photographer
 */
async function init () {
  ({ photographers } = await getPhotographersData());

  /**
   * Set photographer item
   * @param {Object} photographer
   * @param {Object} photographerItem
   * @param {number} photographerItem.id
   * @param {number} userId
   */
  photographers.forEach(photographerItem => {
    if (photographerItem.id === userId) photographer = photographerItem;
  });

  if (!photographer) return photographerNotFound();

  filterChange();
  displayPhotographerHeader();
  displayPhotographerInfos();
};

/**
 * Filter change (event)
 * @param {string} option
 */
function filterChange (option) {
  /**
   * Title filter - sort medias by titles
   * @param {Array} photographer.medias
   * @param {Object} media1
   * @param {Object} media2
   * @param {string} media1.title
   * @param {string} media2.title
   */
  titleFilter = () => photographer.medias.sort((media1, media2) => {
    if (media1.title < media2.title) return -1;
    if (media1.title > media2.title) return 1;

    return 0;
  });
  
  /**
   * Date filter - sort medias by dates
   * @param {Array} photographer.medias
   * @param {Object} media1
   * @param {Object} media2
   * @param {string} media1.date
   * @param {string} media2.date
   */
  dateFilter = () => photographer.medias.sort((media1, media2) => new Date(media1.date).getTime() - new Date(media2.date).getTime());
  
  /**
   * Popularity filter - sort medias by likes
   * @param {Array} photographer.medias
   * @param {Object} media1
   * @param {Object} media2
   * @param {number} media1.likes
   * @param {number} media2.likes
   */
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
