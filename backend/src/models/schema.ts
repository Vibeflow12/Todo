import z from "zod";

export const BaseTodoSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    description: z.string().max(500).nullable().optional(),
})

export type Todo = z.infer<typeof BaseTodoSchema>

export const CreateTodoSchema = BaseTodoSchema.strict();

export const UpdateTodoSchema = BaseTodoSchema.partial().strict();

export const TodoSchema = BaseTodoSchema.extend({
    id: z.string(),
    description: z.string().nullable(),
    completed: z.boolean(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})
