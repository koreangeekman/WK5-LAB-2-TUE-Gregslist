import { Car } from './models/Car.js'
import { House } from "./models/House.js"
import { Job } from "./models/Job.js"
import { EventEmitter } from './utils/EventEmitter.js'
import { isValidProp } from './utils/IsValidProp.js'
import { loadState } from './utils/Store.js'

class ObservableAppState extends EventEmitter {
  page = ''
  user = null
  /** @type {import('./models/Account.js').Account | null} */
  // @ts-ignore
  account = null
  socketData = []

  // SECTION GLOBAL VARIABLES

  /** @type {Car[]} */
  cars = []

  /** @type {House[]} */
  houses = []

  /** @type {Job[]} */
  jobs = []


  // !SECTION GLOBAL VARIABLES

  // Used to load initial data
  init() {
    // this.cars = loadState('cars', [Car])
    // this.houses = loadState('houses', [House])
    // this.jobs = loadState('jobs', [Job])
  }
}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})