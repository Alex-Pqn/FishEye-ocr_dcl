class PhotographerMediaVideo {
  /**
   * Photographer media video
   * @param {photographerId: number, id: number, title: string, video: string, likes: number} media
   */
  constructor (media) {
    this._photographerId = media.photographerId;
    this._id = media.id;
    this._title = media.title;
    this._videoUrl = media.video;
    this._totalLikes = media.likes;
  }

  get mediaUrl () {
    return `assets/photographers/${this._photographerId}/${this._videoUrl}`;
  }
  get mediaType () {
    return 'video';
  }
  get mediaCard () {
    return `<video muted> <source src="${this.mediaUrl}#t=0.1" type="video/mp4" title="${this._title}, closeup view" alt="${this._title}"> Your browser does not support the video tag. </video>`;
  }
}
