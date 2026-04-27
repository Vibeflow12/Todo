import z from "zod";

export const BaseTodoSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().max(500).nullable().optional(),
    completed: z.boolean(),
})

export type Todo = z.infer<typeof BaseTodoSchema>

export const CreateTodoSchema = BaseTodoSchema.strict();

export const UpdateTodoSchema = BaseTodoSchema.partial().strict();