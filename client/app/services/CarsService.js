import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js"

class CarsService {

  async getCars() {
    const res = await api.get('api/cars')
    console.log('GOT CARS', res.data);
    const newCars = res.data.map(carPOJO => new Car(carPOJO))
    AppState.cars = newCars
  }

  async createCar(carFormData) {
    const res = await api.post('api/cars', carFormData)
    AppState.cars.push(new Car(res.data))
    AppState.emit('cars')
  }

  async removeCar(carId) {
    const res = await api.delete(`api/cars/${carId}`)
    console.log('DELETED CAR', res.data); // "deleted value"
    const carIndex = AppState.cars.findIndex(car => car.id == carId)
    if (carIndex == -1) {
      return
    }
    AppState.cars.splice(carIndex, 1)
    AppState.emit('cars')
  }
}

export const carsService = new CarsService()