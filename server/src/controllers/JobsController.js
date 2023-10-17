import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService.js";

export class JobsController extends BaseController {
  constructor() {
    super('api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJobById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
      .put('/:jobId', this.updateJob)
      .delete('/:jobId', this.removeJob)
  }

  async getJobs(req, res, nxt) {
    try {
      const cars = await jobsService.getJobs();
      return res.send(cars)
    } catch (error) {
      nxt(error)
    }
  }

  async getJobById(req, res, nxt) {
    try {
      const car = await jobsService.getJobById(req.params.jobId);
      return res.send(car)
    } catch (error) {
      nxt(error)
    }
  }

  // SECTION AUTHENTICATED SERVICES

  async createJob(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo
      const car = await jobsService.createJob(req.body);
      return res.send(car)
    } catch (error) {
      nxt(error)
    }
  }




}