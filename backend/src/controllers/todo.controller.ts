import type { Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync.js"
import { AppError } from "../utils/AppError.js"


const health = (req: Request, res: Response) => {

    try {
        return res.status(200).send("online...")
    } catch (error) {
        console.error("ERROR: ", error)
        throw new Error("Server is offline")
    }
}

//create Todo 

const createTodo = (req: Request, res: Response) => {

    try {

    } catch (error) {
        console.error("ERROR: ", error)
        throw new Error("Server is offline")
    }
}
//update Todo 
//delete Todo 
// get all todos
// get perticualar todo on search
// tags


export { health, createTodo }