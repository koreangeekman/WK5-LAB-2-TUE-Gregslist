import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  let contentHTML = ''
  AppState.cars.forEach(car => contentHTML += car.CarCardTemplate)
  setHTML('carCards', contentHTML)
}
function _drawCarForm() {
  if (!AppState.account) {
    return
  }
  setHTML('carForm', Car.CarFormTemplate)
}

function _drawALL() {
  _drawCarForm();
  _drawCars();
}

export class CarsController {
  constructor() {
    this.getCars()
    _drawCarForm()

    AppState.on('cars', _drawCars)
    AppState.on('account', _drawALL)
  }

  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async createCar(event) {
    try {
      event.preventDefault()
      await carsService.createCar(getFormData(event.target))
      event.target.reset()
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }

  async removeCar(carId) {
    try {
      const wantsToDelete = await Pop.confirm('Are you sure you want to delete this car?')
      if (!wantsToDelete) { return }
      await carsService.removeCar(carId)
    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }
}