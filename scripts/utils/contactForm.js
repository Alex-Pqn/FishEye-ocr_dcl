
/**
 * Validate form contact
 * @param {Object} form
 * @param {Object} event
 */
function validateFormContact (form, event) {
  event.preventDefault();
  
  const user = {
    firstname: form.elements['firstname'].value,
    lastname: form.elements['lastname'].value,
    email: form.elements['email'].value,
    message: form.elements['message'].value
  }
  
  console.log(user)
}