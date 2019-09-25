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
    ParseIntPipe,

} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        console.log('id is : ', id);
        const task = this.tasksService.getTaskById(id);
        return task;
    }
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        // this.getTaskById(id);
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.tasksService.updateTask(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
    ): Promise<Task> {
        // console.log('title: ', title , 'description: ' , description);
        return this.tasksService.createTask(createTaskDto);
    }
}
