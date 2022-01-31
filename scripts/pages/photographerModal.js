const modalImgElement = document.querySelector('.modal-media-img img');
const modalVideoElement = document.querySelector('.modal-media-img video');
const modalTitleElement = document.querySelector('.modal-media-title p');
const mediaModalElement = document.getElementById('media_modal');

let actualModalMediaId;

document.addEventListener('keydown', event => {
  const isMediaModalActive = () => mediaModalElement.style.display = 'block';

  const key = event.key;

  if (isMediaModalActive) {
    switch (key) {
      case 'ArrowRight':
        mediaModalSlide(1);
        break;
      case 'ArrowLeft':
        mediaModalSlide(-1);
        break;
      default:
    }
  }
});

function getAssetPath (photographerId, media) {
  return `assets/photographers/${photographerId}/${media}`;
}

function displayMediaModal () {
  mediaModalElement.style.display = 'flex';
}
function closeMediaModal () {
  mediaModalElement.style.display = 'none';
}

// reset media modal
function mediaModalReset () {
  modalImgElement.setAttribute('src', '');
  modalVideoElement.setAttribute('src', '');

  modalImgElement.style.display = 'none';
  modalVideoElement.style.display = 'none';
}

// set media modal
function setMediaModal (mediaId, mediaType, mediaUrl, mediaTitle) {
  actualModalMediaId = mediaId;
  mediaModalReset();

  if (mediaType === 'image') {
    modalImgElement.setAttribute('src', mediaUrl);
    modalImgElement.setAttribute('alt', mediaTitle);
    modalImgElement.style.display = 'flex';
  } else {
    modalVideoElement.setAttribute('src', mediaUrl);
    modalVideoElement.setAttribute('alt', mediaTitle);
    modalVideoElement.style.display = 'flex';
  }

  modalTitleElement.textContent = mediaTitle;
}

// on media modal slide
function mediaModalSlide (slideAction) {
  // get the actual media index
  const actualMediaIndex = photographerMedias.findIndex(media => {
    if (media.id === actualModalMediaId) {
      return true;
    }
  });

  // next slide
  function nextSlide () {
    const nextMediaIndex = actualMediaIndex + 1;

    let nextMedia = photographerMedias[nextMediaIndex];
    if (!nextMedia) nextMedia = photographerMedias[0];

    const nextMediaType = (nextMedia.image) ? 'image' : 'video';
    const nextMediaUrl = getAssetPath(nextMedia.photographerId, nextMedia.image || nextMedia.video);

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }
  // previous slide
  function prevSlide () {
    const prevMediaIndex = actualMediaIndex - 1;

    let nextMedia = photographerMedias[prevMediaIndex];
    if (!nextMedia) nextMedia = photographerMedias[photographerMedias.length - 1];

    const nextMediaType = (nextMedia.image) ? 'image' : 'video';
    const nextMediaUrl = getAssetPath(nextMedia.photographerId, nextMedia.image || nextMedia.video);

    setMediaModal(nextMedia.id, nextMediaType, nextMediaUrl, nextMedia.title);
  }

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
