const contactModal = document.getElementById('contact_modal');
const mediaModal = document.getElementById('media_modal');

function displayContactModal () {
  contactModal.style.display = 'flex';
}
function closeContactModal () {
  contactModal.style.display = 'none';
}

function displayMediaModal () {
  mediaModal.style.display = 'flex';
}
function closeMediaModal () {
  mediaModal.style.display = 'none';
}

document.addEventListener('keydown', event => {
  const isMediaModalActive = () => mediaModal.style.display !== 'none';
  const key = event.key;
  
  if (isMediaModalActive) {
    switch (key) {
      case 'ArrowRight':
      case 'ArrowUp':
        mediaModalSlide(1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        mediaModalSlide(-1);
        break;
      case 'Escape':
        closeMediaModal()
        break;
      default:
    }
  }
});