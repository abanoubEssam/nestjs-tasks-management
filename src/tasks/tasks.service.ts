import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import * as firebase from 'firebase';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        console.log('service works');
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            // tslint:disable-next-line: no-shadowed-variable
            tasks = tasks.filter(tasks => tasks.status === status);
        }
        if (search) {
            // tslint:disable-next-line: no-shadowed-variable
            tasks = tasks.filter(tasks =>
                tasks.title.includes(search) ||
                tasks.description.includes(search),
            );
        }
        return tasks;
    }
    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }
    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskById(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        console.log('task updated: ', task);
        return task;
    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

}
