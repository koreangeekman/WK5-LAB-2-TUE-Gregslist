import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class JobsService {

  async getJobs() {
    const jobs = await dbContext.Jobs.find();
    return jobs
  }

  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId);
    if (!job) { throw new BadRequest(`Could not find job with ID: ${jobId}`) }
    return job
  }

  // SECTION AUTHENTICATED SERVICES

  async createJob(body) {
    const newJob = await dbContext.Jobs.create(body);
    return newJob
  }

  async removeJob(jobId, userId) {
    const toBeRemoved = await this.getJobById(jobId);
    if (toBeRemoved.creatorId.toString() != userId) {
      throw new Forbidden('Not your job entry to remove');
    }
  }

  async updateJob(jobId, body, userId) {
    const toBeRemoved = await this.getJobById(jobId);
    if (toBeRemoved.creatorId.toString() != userId) {
      throw new Forbidden('Not your job entry to update');
    }
    toBeRemoved.company = body.company
    toBeRemoved.jobTitle = body.jobTitle
    toBeRemoved.hours = body.hours
    toBeRemoved.rate = body.rate
    toBeRemoved.description = body.description

    await toBeRemoved.update();
    return toBeRemoved
  }

}

export const jobsService = new JobsService();