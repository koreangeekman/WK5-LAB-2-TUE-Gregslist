import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getCars)
      .get('/:carId', this.getCarById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCar)
      .put('/:carId', this.updateCar)
      .delete('/:carId', this.removeCar)
  }

  async getCars(req, res, nxt) {
    try {
      const cars = await carsService.getCars();
      return res.send(cars)
    } catch (error) {
      nxt(error)
    }
  }

  async getCarById(req, res, nxt) {
    try {
      const car = await carsService.getCarById(req.params.carId);
      return res.send(car)
    } catch (error) {
      nxt(error)
    }
  }

  // SECTION AUTHENTICATED SERVICES

  async createCar(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id // replaces any provided/planted user ID with actual account in request
      const newCar = await carsService.createCar(req.body)
      return res.send(newCar)
    } catch (error) {
      nxt(error)
    }
  }

  async removeCar(req, res, nxt) {
    try {
      const result = await carsService.removeCar(req.params.carId, req.userInfo.id);
      return res.send(`This house entry has been deleted: ${result}`)
    } catch (error) {
      nxt(error)
    }
  }

  async updateCar(req, res, nxt) {
    try {
      const updatedCar = await carsService.updateCar(req.params.carId, req.body, req.userInfo.id)
      return res.send(updatedCar)
    } catch (error) {
      nxt(error)
    }
  }

}