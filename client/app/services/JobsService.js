import { AppState } from "../AppState.js";
import { Job } from "../models/Job.js";
import { saveState } from "../utils/Store.js";
import { api } from "./AxiosService.js";

function _saveJobs() {
  saveState('jobs', AppState.jobs);
}

class JobsService {

  async getJobs() {
    const res = await api.get('api/jobs');
    AppState.jobs = res.data.map(j => new Job(j));
  }

  async addJob(newJob) {
    const res = await api.post('api/jobs', newJob)
    AppState.jobs.push(new Job(res.data));
    // _saveJobs();
    AppState.emit('jobs');
  }

  async removeJob(id) {
    const res = await api.delete(`api/jobs/${id}`);
    const jobIndex = AppState.jobs.findIndex(job => job.id == id);
    if (jobIndex == -1) {
      throw new Error('Job ID does not exist');
    }
    AppState.jobs.splice(jobIndex, 1);
    // _saveJobs();
    AppState.emit('jobs');
  }

}

export const jobsService = new JobsService();