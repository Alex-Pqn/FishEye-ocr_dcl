let photographerMedias = [];
let photographer = {};

const urlParams = new URLSearchParams(window.location.search);
const userId = +urlParams.get('id');

function photographerNotFound () {
  console.log('photographerNotFound');
}

// get photographer data from API
async function getPhotographer () {
  const response = await fetch('./data/photographers.json');
  const photographerData = await response.json();

  photographerData.media.forEach(media => {
    if (media.photographerId === userId) photographerMedias.push(media);
  });
  photographerData.photographers.forEach(user => {
    if (user.id === userId) photographer = user;
  });

  return ({ photographerMedias: [...photographerMedias], photographer });
}

// display photographer details
function displayPhotographerDetails () {
  const headerNameElement = document.querySelector('#photograph-name');
  const headerCityElement = document.querySelector('#photograph-city');
  const headerTaglineElement = document.querySelector('#photograph-tagline');
  const headerImgElement = document.querySelector('#photograph-img');
  const contactModalHeaderElement = document.querySelector('#contact_modal header h1 span');

  headerNameElement.textContent = photographer.name;
  contactModalHeaderElement.textContent = photographer.name;
  headerCityElement.textContent = `${photographer.city}, ${photographer.country}`;
  headerTaglineElement.textContent = photographer.tagline;
  headerImgElement.setAttribute('src', `./assets/photographers/${photographer.portrait}`);
  headerImgElement.setAttribute('alt', photographer.name);
}

// display photographer infos
function displayPhotographerInfos () {
  const totalMediasLikes = () => photographerMedias.reduce((acc, curr) => acc + curr.likes, 0);

  const infosPriceElement = document.querySelector('#photograph-infos-price');
  const infosLikesElement = document.querySelector('#photograph-infos-likes');

  infosLikesElement.textContent = totalMediasLikes();
  infosPriceElement.textContent = photographer.price;
}

// display photographer medias
function displayPhotographerMedias () {
  const photographerMediasSection = document.querySelector('.photograph-medias_section');

  // reset medias
  document.querySelectorAll('.photograph-media-item').forEach(media => media.remove());

  photographerMedias.forEach(photographerMedia => {
    const photographerMediaModel = photographerMediaFactory(photographerMedia);
    const photographerMediaCardDOM = photographerMediaModel.getPhotographerMediaCardDOM();
    photographerMediasSection.insertAdjacentHTML('beforeend', photographerMediaCardDOM);
  });
}

// increment media like
// on like event
function incrementMediaLike (mediaLikedId) {
  photographerMedias.forEach(media => {
    if (media.id === mediaLikedId) {
      media.likes++;
      document.querySelector(`[data-id='${mediaLikedId}'] .photograph-media-item_bottom-likes`).innerHTML = media.likes;

      displayPhotographerInfos();
    }
  });
}

async function init () {
  ({ photographerMedias, photographer } = await getPhotographer());

  if (!photographer || !photographerMedias) return photographerNotFound();

  filterChange();
  displayPhotographerDetails();
  displayPhotographerInfos();
};

// on filter change
function filterChange (option) {
  titleFilter = () => photographerMedias.sort((media1, media2) => {
    if (media1.title < media2.title) return -1;
    if (media1.title > media2.title) return 1;
    return 0;
  });
  dateFilter = () => photographerMedias.sort((media1, media2) => new Date(media1.date).getTime() - new Date(media2.date).getTime());
  popularityFilter = () => photographerMedias.sort((media1, media2) => media2.likes - media1.likes);

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
