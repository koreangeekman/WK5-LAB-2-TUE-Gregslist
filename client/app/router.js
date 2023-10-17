import { CarsController } from "./controllers/CarsController.js";
import { HousingController } from "./controllers/HousingController.js";
import { JobsController } from "./controllers/JobsController.js";
import { CarsView } from "./views/CarsView.js";
import { HousingView } from "./views/HousingView.js";
import { JobsView } from "./views/JobsView.js";

/**
 * Register your routes for the application here
 * @type {Route[]}
 */
export const router = [
  {
    path: '',
    // @ts-ignore
    controller: null,
    view: `
      <img src="https://user-images.githubusercontent.com/102513373/208785565-ae846909-1be5-48ff-b37c-e6c091b36dc4.png" alt="Gregslist Logo" id="homePage" >
    `
  },
  {
    path: '#/cars',
    controller: CarsController,
    view: CarsView
  },
  {
    path: '#/housing',
    controller: HousingController,
    view: HousingView
  },
  {
    path: '#/jobs',
    controller: JobsController,
    view: JobsView
  },
]






/**
 * Supporting types for the router
 * NOTE Controllers must be non instantiated 
 * @typedef {{[x:string]:any}} controller
 * @typedef {{path: string, controller?:controller |controller[], view?: string, target?: string}} Route
 */