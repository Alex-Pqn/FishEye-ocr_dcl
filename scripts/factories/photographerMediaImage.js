// eslint-disable-next-line no-unused-vars
class PhotographerMediaImage {
  /**
   * Photographer media image
   * @param {photographerId: number, id: number, title: string, image: string, likes: number} media
   */
  constructor (media) {
    this._photographerId = media.photographerId;
    this._id = media.id;
    this._title = media.title;
    this._imageUrl = media.image;
    this._totalLikes = media.likes;
  }

  get mediaUrl () {
    return `assets/photographers/${this._photographerId}/${this._imageUrl}`;
  }

  get mediaType () {
    return 'image';
  }

  get mediaCard () {
    return `<img src="${this.mediaUrl}" title="${this._title}, closeup view" alt="${this._title}">`;
  }
}
