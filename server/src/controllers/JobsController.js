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
      const jobs = await jobsService.getJobs();
      return res.send(jobs)
    } catch (error) {
      nxt(error)
    }
  }

  async getJobById(req, res, nxt) {
    try {
      const job = await jobsService.getJobById(req.params.jobId);
      return res.send(job)
    } catch (error) {
      nxt(error)
    }
  }

  // SECTION AUTHENTICATED SERVICES

  async createJob(req, res, nxt) {
    try {
      req.body.creatorId = req.userInfo.id
      const newJob = await jobsService.createJob(req.body);
      return res.send(newJob)
    } catch (error) {
      nxt(error)
    }
  }

  async removeJob(req, res, nxt) {
    try {
      const job = await jobsService.removeJob(req.params.jobId, req.userInfo.id);
      return res.send(job)
    } catch (error) {
      nxt(error)
    }
  }

  async updateJob(req, res, nxt) {
    try {
      const job = await jobsService.updateJob(req.params.jobId, req.body, req.userInfo.id);
      return res.send(job)
    } catch (error) {
      nxt(error)
    }
  }

}