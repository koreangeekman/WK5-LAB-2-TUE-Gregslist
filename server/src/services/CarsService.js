import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class CarsService {
  async getCars() {
    const cars = await dbContext.Car.find();
    return cars
  }

  async getCarById(id) {
    const car = await dbContext.Car.findById(id);
    if (!car) { throw new BadRequest(`Unable to find car with ID: ${id}`) }
    return car
  }

  async createCar(data) {
    const car = await dbContext.Car.create(data);
    return car
  }

  async removeCar(carId, userId) {
    // const result = await dbContext.Car.findByIdAndDelete(id); // anyone can delete
    // const toBeDeleted = await dbContext.Car.findById(id); // results in error if car not found
    const toBeDeleted = await this.getCarById(carId)
    if (toBeDeleted.creatorId.toString() != userId) {
      throw new Forbidden('Not your car to delete')
    }
    await toBeDeleted.remove()
    return toBeDeleted
  }

  async updateCar(carId, body, userId) {
    // await dbContext.Car.findByIdAndUpdate(carId, body) // allows anything & everything to be 'updated'
    const toBeUpdated = await this.getCarById(carId)
    if (toBeUpdated.createdAt.toString() != userId) {
      throw new Forbidden('Not your car to change')
    }
    toBeUpdated.make = body.make || toBeUpdated.make
    toBeUpdated.model = body.model || toBeUpdated.model
    toBeUpdated.color = body.color || toBeUpdated.color
    toBeUpdated.price = body.price != undefined ? body.price : toBeUpdated.price
    toBeUpdated.runs = body.runs != undefined ? body.runs : toBeUpdated.runs
    // ^ for boolean changes or values that equate to 0 (triggers undefined)

    await toBeUpdated.save()
    return toBeUpdated
  }

}

export const carsService = new CarsService();