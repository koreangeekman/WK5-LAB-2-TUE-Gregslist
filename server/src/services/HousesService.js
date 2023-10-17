import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class HousesService {

  async getHouses() {
    const houses = await dbContext.Houses.find();
    return houses;
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId);
    if (!house) { throw new BadRequest(`Unable to find house with ID: ${houseId}`) }
    return house;
  }

  async createHouse(body) {
    const newHouse = await dbContext.Houses.create(body);
    return newHouse
  }

  async removeHouse(houseId, userId) {
    const toBeRemoved = await this.getHouseById(houseId);
    if (toBeRemoved.creatorId.toString() != userId) {
      throw new Forbidden('Not your house to remove!')
    }
    await toBeRemoved.remove()
    return toBeRemoved
  }

  async updateHouse(houseId, body, userId) {
    const toBeUpdated = await this.getHouseById(houseId);
    if (toBeUpdated.creatorId.toString() != userId) {
      throw new Forbidden('Not your house to update!')
    }
    toBeUpdated.year = body.year
    toBeUpdated.price = body.price != undefined ? body.price : toBeUpdated.price
    toBeUpdated.bedrooms = body.bedrooms
    toBeUpdated.bathrooms = body.bathrooms
    toBeUpdated.levels = body.levels
    toBeUpdated.imgUrl = body.imgUrl
    toBeUpdated.description = body.description

    await toBeUpdated.save()
    return toBeUpdated
  }

}

export const housesService = new HousesService();