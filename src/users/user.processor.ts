import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('user-delete')
export class UserDeleteQueue {
  @Process('delete')
  async deleteUserDatabase(job: Job) {
    console.log('11111111', job.data);
  }
}
