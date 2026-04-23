import type { Request, RequestHandler, Response } from "express"
import { catchAsync } from "../utils/catchAsync.js"
import { AppError } from "../utils/AppError.js"
import { prisma } from "../lib/prisma.js"
import { CreateTodoSchema, UpdateTodoSchema } from "../models/schema.js"


const health = (req: Request, res: Response) => {

    try {
        return res.status(200).send("online...")
    } catch (error) {
        console.error("ERROR: ", error)
        throw new Error("Server is offline")
    }
}

//create Todo 

const createTodo: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const parse = CreateTodoSchema.safeParse(req.body);

    if (!parse.success) {
        throw new AppError(JSON.stringify(parse.error.flatten()), 400);
    }

    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }

    const { name, description } = parse.data;

    const todo = await prisma.todo.create({
        data: {
            name,
            description: description ?? null,
            authorId: req.user.id,
        },
    });

    return res.status(201).json({
        message: "todo created successfully",
        todo,
    });
});

//update Todo 

const updateTodo: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const parse = UpdateTodoSchema.safeParse(req.body);

    if (!parse.success) {
        throw new AppError(JSON.stringify(parse.error.flatten()), 400);
    }

    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }

    const { name, description } = parse.data;
    const { id } = req.params;

    if (name === undefined && description === undefined) {
        throw new AppError("Nothing to update", 400);
    }

    const updatedTodo = await prisma.todo.updateMany({
        where: {
            id: id as string,
            authorId: req.user.id,
        },
        data: {
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description: description ?? null }),
        },
    });

    if (updatedTodo.count === 0) {
        throw new AppError("Todo not found or unauthorized", 404);
    }

    return res.status(200).json({
        message: "todo updated successfully",
        updatedTodo
    });
});

//delete Todo 
const deleteTodo: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }

    const { id } = req.params;

    if (!id) {
        throw new AppError("Todo ID is required", 400);
    }

    const deletedTodo = await prisma.todo.deleteMany({
        where: {
            id: id as string,
            authorId: req.user.id,
        },
    });

    if (deletedTodo.count === 0) {
        throw new AppError("Todo not found or unauthorized", 404);
    }


    return res.status(200).json({
        message: "todo deleted successfully",
    });
});

// get all todos

const getAllTodos: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }
    const search = req.query.search as string | undefined;

    const allTodos = await prisma.todo.findMany({
        where: {
            authorId: req.user.id,
            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        },
                        description: {
                            contains: search,
                            mode: "insensitive"
                        },
                    }
                ]
            })
        },
    });

    return res.status(200).json({
        message: "all todos",
        todo: allTodos,
    });
});
// get perticualar todo on search
const getOneTodo: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }
    const { id } = req.params

    if (!id) {
        throw new AppError("Todo id is required", 404);
    }

    const oneTodos = await prisma.todo.findFirst({
        where: {
            id: id as string,
            authorId: req.user.id,
        },
    });

    if (!oneTodos) {
        throw new AppError("Todo not found ", 404);
    }

    return res.status(200).json({
        message: "todo fetch successfully",
        oneTodos,
    });
});

export { health, createTodo, updateTodo, deleteTodo, getAllTodos, getOneTodo }