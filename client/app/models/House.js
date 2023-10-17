import { AppState } from "../AppState.js"
import { generateId } from "../utils/GenerateId.js"

export class House {
  constructor(data) {
    this.id = data.id || generateId()
    this.year = data.year
    this.levels = data.levels
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.price = data.price
    this.description = data.description
    this.imgUrl = data.imgUrl
    this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : new Date().toLocaleString()
    this.creatorId = data.creatorId
  }

  //   {
  //     "_id": "645d60f381faf24223ae886b",
  //     "bedrooms": 3,
  //     "bathrooms": 2,
  //     "levels": 2,
  //     "imgUrl": "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg",
  //     "year": 2003,
  //     "price": 230000,
  //     "description": "Super sick house",
  //     "creatorId": "63f7d6202d1cf882287f12e2",
  //     "createdAt": "2023-05-11T21:41:07.979Z",
  //     "updatedAt": "2023-05-11T21:41:07.979Z",
  //     "__v": 0,
  //     "creator": {
  //         "_id": "63f7d6202d1cf882287f12e2",
  //         "name": "Charles Francis Xavier",
  //         "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
  //         "id": "63f7d6202d1cf882287f12e2"
  //         },
  //     "id": "645d60f381faf24223ae886b"
  // },

  get houseCard() {
    return `
        <div class="col-12 col-md-4 p-2">
          <div class="card shadow p-3">
            <img src="${this.imgUrl}" alt="house image">
              <div class="d-flex justify-content-between align-items-center overlay p-2">
                <p class="fs-5 fw-bold price">$${this.price}</p>
                ${this.accountMatch}
              </div>
            <div class="d-flex justify-content-evenly">
              <div>
                <p><b>Year</b>: ${this.year}</p>
                <p><b>Floors</b>: ${this.levels}</p>
              </div>
              <div>
                <p><b>Bedrooms</b>: ${this.bedrooms}</p>
                <p><b>Bathrooms</b>: ${this.bathrooms}</p>
              </div>
            </div>
            <p><b>Description</b>: ${this.description}</p>
            <p class="text-secondary w-100 text-end mb-0"><small>Created At: ${this.createdAt}</small></p>
            <p class="text-secondary w-100 text-end mb-0"><small>Updated At: ${this.updatedAt}</small></p>
            <hr>
          </div>
        </div>
    `
  }

  get accountMatch() {
    if (AppState.account?.id == this.creatorId) {
      return `
        <i class="fs-1 remove btn mdi mdi-trash-can" onclick="app.HousingController.removeHouse('${this.id}')"></i>
      `
    }
    return ''
  }

  static get housesFormTemplate() {
    return `
    <div class="col-12 col-md-8 p-3">
      <form class="p-3 p-md-4 formCard" onsubmit="app.HousingController.addHouse(event)">
        <p class="fs-3 fw-bold">New House Form</p>
        <span class="">
          <label for="year">Year:</label>
          <input class="form-control" type="number" name="year" id="year" max="2024" placeholder="2002" required>
        </span>
        <span class="">
          <label for="bedrooms">Bedrooms:</label>
          <input class="form-control" type="number" name="bedrooms" id="bedrooms" max="12" placeholder="4" required>
        </span>
        <span class="">
          <label for="bathrooms">Bathrooms:</label>
          <input class="form-control" type="number" name="bathrooms" id="bathrooms" max="12" placeholder="2.5"
            required>
        </span>
        <span class="">
          <label for="levels">Levels:</label>
          <input class="form-control" type="number" name="levels" id="levels" max="500" placeholder="2" required>
        </span>
        <span class="">
          <label for="price">Price:</label>
          <span class="d-flex align-items-center ps-2">$
            <input class="form-control" type="number" name="price" id="price" min="0" max="100000000"
              placeholder="256000" required>
          </span>
        </span>
        <span class="">
          <label for="description">Description:</label>
          <textarea class="form-control" type="text" name="description" id="description" minlength="10"
            maxlength="320" placeholder="Please enter a short description" rows="3" required></textarea>
        </span>
        <span class="">
          <label for="imgUrl">Image URL:</label>
          <input class="form-control" type="url" name="imgUrl" id="imgUrl"
            placeholder="Please submit a URL for the image" maxlength="200">
        </span>
        <button class="btn btn-success my-3" type="submit">Submit</button>
      </form>
    </div>
    `
  }
}