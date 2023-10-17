import { AppState } from "../AppState.js"

export class Car {
  constructor(data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.year = data.year
    this.imgUrl = data.imgUrl
    this.price = data.price
    this.color = data.color || '#000000'
    this.description = data.description || ''
    this.engineType = data.engineType
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }

  get CarCardTemplate() {
    // FIXME interpolate color
    return `
    <div class="col-12 mb-3">
      <div class="bg-light border border-2 rounded shadow d-flex" style="border-color: ${this.color};">
        <img class="rounded-start car-img"
          src="${this.imgUrl}"
          alt="${this.make} ${this.model}">
        <div class="p-3">
          <h2>${this.year} ${this.make} ${this.model}</h2>
          <p>Listed on: ${this.createdAt.toLocaleDateString()},
            Last updated: ${this.updatedAt.toLocaleDateString()}</p>
          <h3>$${this.price}</h3>
          <p>${this.description}</p>
          <p>Engine type: ${this.engineType}</p>
          <div class="text-end">
            ${this.ComputeDeleteButton}
          </div>
        </div>
      </div>
    </div>
    `
  }

  get ComputeDeleteButton() {
    // NOTE ? is elvis operator
    if (AppState.account?.id == this.creatorId) {
      return `
      <button onclick="app.CarsController.removeCar('${this.id}')" class="btn btn-danger">Delete Car</button>`
    }
    return ''
  }

  // NOTE static methods only exist on the unabstantiated class (class definition)
  static get CarFormTemplate() {
    return `
    <div class="col-12 col-md-8 p-4">
      <form onsubmit="app.CarsController.createCar(event)">

        <div class="mb-2">
          <label for="make">Make</label>
          <input id="make" type="text" required maxlength="500" name="make" placeholder="Car Make...">
        </div>

        <div class="mb-2">
          <label for="model">Model</label>
          <input id="model" type="text" required maxlength="500" name="model" placeholder="Car Model...">
        </div>

        <div class="mb-2">
          <label for="year">Year</label>
          <input id="year" type="number" required min="1900" max="2024" placeholder="2020" name="year">
        </div>


        <div class="mb-2">
          <label for="imgUrl">Image URL</label>
          <input id="imgUrl" type="url" required maxlength="500" name="imgUrl" placeholder="Car ImgUrl...">
        </div>


        <div class="mb-2">
          <label for="price">Price</label>
          <input id="price" type="number" required name="price" min="0" max="1000000">
        </div>

        <div class="mb-2">
          <label for="color">Color</label>
          <input class="color" id="color" type="color" name="color">
        </div>

        <label for="engineType">Engine Type...</label>



        <select name="engineType" id="engineType">
          <option value="unknown">Unknown</option>
          <option value="2 stroke">2 stroke</option>
          <option value="4 cylinder">4 cylinder</option>
          <option value="v6">V6</option>
          <option value="v8">V8</option>
          <option value="v10">V10</option>
          <option value="v12">V12</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="chuncko">Chuncko</option>
        </select>

        <div class="mb-2">
          <label for="description">Description</label>
          <textarea name="description" id="description" rows="5" placeholder="Car Description..."
            maxlength="500"></textarea>
        </div>


        <div>
          <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>
    `
  }
}

const carData = {
  "id": "6462ed1266d4560e6cfa0f39",
  "_id": "6462ed1266d4560e6cfa0f39",
  "make": "Honda",
  "model": "Accord",
  "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/dsc00620-1677186777.jpg?crop=0.606xw:0.680xh;0.298xw,0.260xh&resize=640:*",
  "year": 2022,
  "price": 1500,
  "description": "zoom zoom",
  "engineType": "unknown",
  "creatorId": "63f7d6202d1cf882287f12e2",
  "createdAt": "2023-05-16T02:40:18.318Z",
  "updatedAt": "2023-05-16T02:40:18.318Z",
  // "__v": 0,
  "creator": {
    "_id": "63f7d6202d1cf882287f12e2",
    "name": "Charles Francis Xavier",
    "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
    "id": "63f7d6202d1cf882287f12e2"
  },
}