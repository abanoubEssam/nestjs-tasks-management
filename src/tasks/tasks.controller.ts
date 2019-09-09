import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    NotFoundException,

} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        console.log('TCL: TasksController -> filterDto', filterDto);
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        console.log('controller works');

        const tasks = this.tasksService.getAllTasks();
        return tasks;
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        console.log('id is : ', id);
        const task = this.tasksService.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task With ID ${id} not found`);
        }
        return task;
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.getTaskById(id);
        this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskById(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
    ): Task {
        // console.log('title: ', title , 'description: ' , description);
        return this.tasksService.createTask(createTaskDto);
    }
}
