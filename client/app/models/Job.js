import { AppState } from "../AppState.js"
import { generateId } from "../utils/GenerateId.js"

export class Job {
  constructor(data) {
    this.id = data.id || generateId()
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.rate = data.rate
    this.hours = data.hours
    this.description = data.description
    this.pay = data.pay
    this.imgUrl = data.imgUrl
    this.createdAt = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString()
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt).toLocaleString() : new Date().toLocaleString()
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  //   {
  //     "_id": "6476d752403259fa173a74ba",
  //     "company": "SuperDuperCoolPlace",
  //     "jobTitle": "Software Developer",
  //     "hours": 40,
  //     "rate": 1000000,
  //     "description": "Are you Super Duper Cool enough?",
  //     "creatorId": "646424169346a51b7a721e71",
  //     "createdAt": "2023-05-31T05:12:50.403Z",
  //     "updatedAt": "2023-05-31T05:12:50.403Z",
  //     "__v": 0,
  //     "creator": {
  //         "_id": "646424169346a51b7a721e71",
  //         "name": "Code-y BeepBoop",
  //         "picture": "https://68.media.tumblr.com/66dd12f943a2496adcb6d556025a2d96/tumblr_oklf80RKa21shq9dbo1_400.gif",
  //        "id": "646424169346a51b7a721e71"
  //         },
  //     "id": "6476d752403259fa173a74ba"
  // },

  get jobCard() {
    return `
      <div div class="col-12 col-md-4 p-2">
        <div class="card shadow p-3 pt-0">
          <div class="d-flex justify-content-between align-items-center overlay pt-3">
            <p class="fs-5 fw-bold price">$${this.rate}</p>
            ${this.accountCheck}
          </div>
          <div class="mt-5 pt-4">
            <p><b>Company</b>: ${this.company}</p>
            <p><b>Job Title</b>: ${this.jobTitle}</p>
            <p><b>Hours</b>: ${this.hours}</p>
            <p><b>Rate</b>: ${this.rate}</p>
          </div>
          <p><b>Description</b>: ${this.description}</p>
          <p class="text-secondary w-100 text-end"><small>Listed At: ${this.createdAt}</small></p>
          <p class="text-secondary w-100 text-end"><small>Updated At: ${this.updatedAt}</small></p>
          <hr>
          <span class="d-block">
            <p class="">OP: ${this.creator.name}</p>
            <img class="creatorIMG" src="${this.creator.picture}">
          </span>
        </div>
      </div >
    `
  }

  get accountCheck() {
    if (AppState.account?.id == this.creatorId) {
      return `
      <i class="fs-1 remove btn mdi mdi-trash-can" onclick="app.JobsController.removeJob('${this.id}')"></i>
      `
    }
    return ''
  }

  static get jobFormTemplate() {
    return `
    <div class="col-12 col-md-8 p-3">
      <form class="p-3 p-md-4 formCard" onsubmit="app.JobsController.addJob(event)">
        <p class="fs-3 fw-bold">New Job Form</p>
        <span class="">
        <label for="jobTitle">Job Title:</label>
        <input class="form-control" type="text" name="jobTitle" id="jobTitle" max-length="30" placeholder="Engineer" required>
        </span>
        <span class="">
          <label for="company">Company:</label>
          <input class="form-control" type="text" name="company" id="company" max-length="30" placeholder="Company" required>
        </span>
        <span class="">
          <label for="hours">Hours:</label>
          <span class="d-flex align-items-center ps-2">
            <input class="form-control" type="number" name="hours" id="hours" min="0" max="80"
              placeholder="40" required>
          </span>
        </span>
        <span class="">
          <label for="rate">Rate:</label>
          <span class="d-flex align-items-center ps-2">$
            <input class="form-control" type="number" name="rate" id="rate" min="0" max="1000000"
              placeholder="128000" required>
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