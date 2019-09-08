import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

    private tasks = ['hello am task 2'];

    getAllTasks() {
        console.log('service works');
        return this.tasks;
    }

}
