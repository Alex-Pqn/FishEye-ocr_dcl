class Photographer {
  constructor(id, name, portrait, country, city, tagline, price) {
    this._id = id
    this._name = name
    this._portrait = portrait
    this._country = country
    this._city = city
    this._tagline = tagline
    this._price = price
  }

  get location() {
    return `${this._city}, ${this._country}`
  }
  
  get pictureUrl () {
    return `assets/photographers/${this._portrait}`;
  }
}