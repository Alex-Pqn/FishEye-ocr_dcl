// eslint-disable-next-line no-unused-vars
class PhotographerMediaFactory {
  /**
   * Photographer media factory
   * @param {video: string, image: string} media
   */
  constructor (media) {
    this._videoUrl = media.video;
    this._imageUrl = media.image;

    switch (this.mediaType) {
      case 'video':
        // eslint-disable-next-line no-undef
        return new PhotographerMediaVideo(media);
      case 'image':
        // eslint-disable-next-line no-undef
        return new PhotographerMediaImage(media);
      default:
        throw new Error('Unknown media format');
    }
  }

  get mediaType () {
    if (this._imageUrl) return 'image';
    else if (this._videoUrl) return 'video';
    else throw new Error('Unknown media type format');
  }
}
