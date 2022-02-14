class MediaFactory {
  /**
   * Photographer media factory
   * @param {Object} media
   * @param {string} media.video
   * @param {string} media.image
   */
  constructor (media) {
    this._videoUrl = media.video;
    this._imageUrl = media.image;
    
    switch (this.mediaType) {
      case 'video':
        return new MediaVideo(media);
      case 'image':
        return new MediaImage(media);
      default:
        throw 'Unknown media format';
    }
  }
  get mediaType () {
    if (this._imageUrl) return 'image';
    else if (this._videoUrl) return 'video';
    else throw 'Unknown media type format';
  }
}