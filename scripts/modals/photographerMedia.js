const modalImgElement = document.querySelector('.modal-media-img img');
const modalVideoElement = document.querySelector('.modal-media-img video');

/** @type {number}  */
let actualMediaId;

/**
 * Reset all media modal attributs
 */
function mediaModalReset () {
  modalImgElement.setAttribute('src', '');
  modalImgElement.setAttribute('alt', '');
  modalImgElement.style.display = 'none';

  modalVideoElement.setAttribute('src', '');
  modalVideoElement.setAttribute('alt', '');
  modalVideoElement.style.display = 'none';
}

/**
 * Set new media modal
 * @param {number} mediaId
 * @param {string} mediaType
 * @param {string} mediaUrl
 * @param {string} mediaTitle
 */
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
      throw 'Unknown media type format';
  }

  actualMediaId = mediaId;
}

/**
 * Media modal slide (event)
 * @param {number} slideAction
 */
function mediaModalSlide (slideAction) {
  /**
   * Get the next asset path
   * @param {number} photographerId
   * @param {string} media
   */
  getNextAssetPath = (photographerId, media) => `assets/photographers/${photographerId}/${media}`;

  // get the actual media index
  const actualMediaIndex = photographer.medias.findIndex(media => {
    if (media.id === actualMediaId) return true;
  });

  /**
   * Next slide (event)
   */
  function nextSlide () {
    /** @type {number}  */
    const nextMediaIndex = actualMediaIndex + 1;

    /** @type {{id: number, photographerId: number, title: string, image: string, video: string}} */
    let nextMedia = photographer.medias[nextMediaIndex];
    
    if (!nextMedia) nextMedia = photographer.medias[0];

    /** @type {string}  */
    const nextMediaType = (nextMedia.image) ? 'image' : 'video';
    
    /** @type {string}  */
    const nextMediaUrl = getNextAssetPath(nextMedia.photographerId, nextMedia.image || nextMedia.video);

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

  /**
   * Previous slide (event)
   */
  function prevSlide () {
    /** @type {number}  */
    const prevMediaIndex = actualMediaIndex - 1;

    /** @type {{id: number, photographerId: number, title: string, image: string, video: string}} */
    let nextMedia = photographer.medias[prevMediaIndex];
    
    if (!nextMedia) nextMedia = photographer.medias[photographer.medias.length - 1];

    /** @type {string}  */
    const nextMediaType = (nextMedia.image) ? 'image' : 'video';
    
    /** @type {string}  */
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
