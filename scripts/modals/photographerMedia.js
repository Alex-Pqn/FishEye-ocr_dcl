const modalImgElement = document.querySelector('.modal-media-img img');
const modalVideoElement = document.querySelector('.modal-media-img video');

let actualMediaId;

// reset media modal
function mediaModalReset () {
  modalImgElement.setAttribute('src', '');
  modalImgElement.setAttribute('alt', '');
  modalImgElement.style.display = 'none';
  
  modalVideoElement.setAttribute('src', '');
  modalVideoElement.setAttribute('alt', '');
  modalVideoElement.style.display = 'none';
}

// set media modal
function setMediaModal (mediaId, mediaType, mediaUrl, mediaTitle) {
  mediaModalReset();
  
  const modalTitleElement = document.querySelector('.modal-media-title p');
  modalTitleElement.textContent = mediaTitle;
  
  switch (mediaType) {
    case 'image':
      modalImgElement.setAttribute('src', mediaUrl);
      modalImgElement.setAttribute('alt', mediaTitle);
      modalImgElement.style.display = 'flex';
      break;
    case 'video':
      modalVideoElement.setAttribute('src', mediaUrl);
      modalVideoElement.setAttribute('alt', mediaTitle);
      modalVideoElement.style.display = 'flex';
      break;
    default: 
      throw 'Unknown media type format'
  }

  actualMediaId = mediaId;
}

// on media modal slide
function mediaModalSlide (slideAction) {
  getNextAssetPath = (photographerId, media) => `assets/photographers/${photographerId}/${media}`;
  
  // get the actual media index
  const actualMediaIndex = photographer.medias.findIndex(media => {
    if (media.id === actualMediaId) return true;
  });

  // next slide
  function nextSlide () {
    const nextMediaIndex = actualMediaIndex + 1;

    let nextMedia = photographer.medias[nextMediaIndex];
    if (!nextMedia) nextMedia = photographer.medias[0];

    const nextMediaType = (nextMedia.image) ? 'image' : 'video';
    const nextMediaUrl = getNextAssetPath(nextMedia.photographerId, nextMedia.image || nextMedia.video);

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }
  
  // previous slide
  function prevSlide () {
    const prevMediaIndex = actualMediaIndex - 1;

    let nextMedia = photographer.medias[prevMediaIndex];
    if (!nextMedia) nextMedia = photographer.medias[photographer.medias.length - 1];

    const nextMediaType = (nextMedia.image) ? 'image' : 'video';
    const nextMediaUrl = getNextAssetPath(nextMedia.photographerId, nextMedia.image || nextMedia.video);

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

  // on slide action
  if (slideAction) {
    switch (slideAction) {
      case -1:
        prevSlide();
        break;
      default:
        nextSlide();
        break;
    }
  }
}