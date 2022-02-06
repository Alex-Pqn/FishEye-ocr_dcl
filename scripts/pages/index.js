async function getPhotographersData () {
  const response = await fetch('./data/photographers.json');
  const photographerData = await response.json();
  
  const photographers = photographerData.photographers
  const photographersMedias = photographerData.media
  
  photographers.forEach(photographer => {
    const photographerMedias = photographersMedias.filter(photographerMedia => photographerMedia.photographerId === photographer.id)
    photographer.medias = [...photographerMedias]
  });

  return ({ photographers });
}