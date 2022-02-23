const contactModal = document.getElementById('contact_modal');
const mediaModal = document.getElementById('media_modal');

// eslint-disable-next-line no-unused-vars
function displayContactModal () {
  contactModal.style.display = 'flex';
  document.getElementById('firstname').focus();
}
// eslint-disable-next-line no-unused-vars
function closeContactModal () {
  contactModal.style.display = 'none';
}

// eslint-disable-next-line no-unused-vars
function displayMediaModal () {
  mediaModal.style.display = 'flex';
}
function closeMediaModal () {
  mediaModal.style.display = 'none';
}

// eslint-disable-next-line no-unused-vars
function setMediaModalFocus () {
  const imgElement = document.querySelector('#media_modal .modal-media-img img');
  const videoElement = document.querySelector('#media_modal .modal-media-img video');

  if (imgElement.getAttribute('src')) imgElement.focus();
  if (videoElement.getAttribute('src')) videoElement.focus();
}

document.addEventListener('keydown', event => {
  const isMediaModalActive = () => mediaModal.style.display !== 'none';
  const key = event.key;

  if (isMediaModalActive) {
    switch (key) {
      case 'ArrowRight':
      case 'ArrowUp':
        // eslint-disable-next-line no-undef
        mediaModalSlide(1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        // eslint-disable-next-line no-undef
        mediaModalSlide(-1);
        break;
      case 'Escape':
        closeMediaModal();
        closeContactModal();
        break;
      default:
    }
  }
});
