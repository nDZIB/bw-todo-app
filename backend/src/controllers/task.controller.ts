import { NextFunction, Request, Response } from "express"
import { ITaskInteractor } from "../interfaces/ITaskInteractor"
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/app.constant";
import { Body, Controller, Delete, Get, Patch, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";

@injectable()
@Tags('Tasks')
@Route('api/v1/tasks')
export class TaskController extends Controller {
    private taskInteractor: ITaskInteractor;

    constructor(@inject(INTERFACE_TYPE.TaskInteractor) taskInteractor: ITaskInteractor) {
        super()
        this.taskInteractor = taskInteractor;
        console.log(taskInteractor);
    }

    @Post('/')
    @SuccessResponse('201', 'Created')
    async onAddTask(@Body() data: any) {
        try {
            const responseData = await this.taskInteractor.addTask(data);
            return responseData
        } catch (error) {
            throw error;
        }
    }

    @Get('/')
    async onGetTasks(@Query('page') page: number, @Query('limit') limit: number) {
        try {
            const responseData = await this.taskInteractor.getTasks(page, limit);
            return { task: responseData }
        } catch (error) {
            throw error;
        }
    }

    @Patch('/:id')
    async onUpdateTask(@Path('id') taskId: number, @Body() data: any) {
        try {
            const responseData = await this.taskInteractor.updateTask(taskId, data);
            return { task: responseData }
        } catch (error) {
            throw error;
        }
    }

    @Delete('/:id')
    async onDeleteTask(@Path('id') taskId: number) {
        try {
            const responseData = await this.taskInteractor.deleteTask(taskId);
            return { task: responseData }
        } catch (error) {
            throw error;
        }
    }
}