class MediaImage {
  /**
   * Photographer media image factory
   * @param {Object} media
   * @param {number} media.photographerId
   * @param {number} media.id 
   * @param {string} media.title 
   * @param {string} media.image
   * @param {number} media.likes
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
    return 'image'
  }
  get mediaCard () {
    return `<img src="${this.mediaUrl}" title="${this._title}, closeup view" alt="${this._title}">`
  }
}