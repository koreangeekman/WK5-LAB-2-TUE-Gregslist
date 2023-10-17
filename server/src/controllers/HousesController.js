import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouseById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .put('/:houseId', this.updateHouse)
      .delete('/:houseId', this.removeHouse)
  }

  async getHouses(req, res, nxt) {
    try {
      const houses = await housesService.getHouses()
      return res.send(houses)
    } catch (error) {
      nxt(error)
    }
  }

  async getHouseById(req, res, nxt) {
    try {
      const house = await housesService.getHouseById(req.params.houseId)
      return res.send(house)
    } catch (error) {
      nxt(error)
    }
  }

  // SECTION AUTHENTICATED SERVICES

  async createHouse(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id // ensures active user is assigned
      const newHouse = await housesService.createHouse(req.body)
      return res.send(newHouse)
    } catch (error) {
      nxt(error)
    }
  }

  async removeHouse(req, res, nxt) {
    try {
      const result = await housesService.removeHouse(req.params.houseId, req.userInfo.id)
      return res.send(`This house entry has been deleted: ${result}`)
    } catch (error) {
      nxt(error)
    }
  }

  async updateHouse(req, res, nxt) {
    try {
      const updatedHouse = await housesService.updateHouse(req.params.houseId, req.body, req.userInfo.id)
      return res.send(updatedHouse)
    } catch (error) {
      nxt(error)
    }
  }

}