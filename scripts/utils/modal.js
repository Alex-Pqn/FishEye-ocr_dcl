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
  setMediaModalFocus();
}
function closeMediaModal () {
  mediaModal.style.display = 'none';
  document.querySelector('.modal-media-img').removeAttribute('tabindex');
}

// eslint-disable-next-line no-unused-vars
function setMediaModalFocus () {
  document.querySelector('.modal-media-img').setAttribute('tabindex', '0');
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
        break;
      default:
    }
  }
});
