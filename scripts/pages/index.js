
/**
 * Get photographers data
 * @return {Array.<{id: number, name: string, portrait: string, country: string, city: string, tagline: string, price: number, pictureUrl: string, medias: Array.<{id: number, photographerId: number, date: string, likes: number, price: number, title: string, video: string}>}>}
 */
async function getPhotographersData () {
  const response = await fetch('./data/photographers.json');
  const photographerData = await response.json();

  /** @type {Array.<{id: number, name: string, portrait: string, country: string, city: string, tagline: string, price: number, pictureUrl: string, medias: Array}>}  */
  const photographers = photographerData.photographers;

  /** @type {Array.<{id: number, photographerId: number, date: string, likes: number, price: number, title: string, video: string}>}  */
  const photographersMedias = photographerData.media;

  photographers.forEach(photographer => {
    // push medias according to photographerId
    const photographerMedias = photographersMedias.filter(photographerMedia => photographerMedia.photographerId === photographer.id);
    photographer.medias = [...photographerMedias];
  });
  
  return { photographers };
}
