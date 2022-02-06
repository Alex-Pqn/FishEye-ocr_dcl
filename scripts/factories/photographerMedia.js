class Media {
  constructor(photographerId, id, title, video, image, likes) {
    this._photographerId = photographerId
    this._id = id
    this._title = title
    this._videoUrl = video
    this._imageUrl = image
    this._totalLikes = likes
  }

  get mediaType() {
    if (this._imageUrl) return `image`;
    else if (this._videoUrl) return `video`;
    
    else throw 'Unknown media type format'
  }
  get mediaUrl() {  
    const baseUrl = `assets/photographers/${this._photographerId}`;
    
    switch (this.mediaType) {
      case 'video':
        if (this._videoUrl) return `${baseUrl}/${this._videoUrl}`;
        else throw 'Unknown media video url'
      case 'image':
        if (this._imageUrl) return `${baseUrl}/${this._imageUrl}`;
        else throw 'Unknown media image url'
      default: 
        throw 'Unknown media type format'
    }
  }
}
