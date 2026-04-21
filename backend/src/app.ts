import express, { type Application } from "express";
import v1Router from "./routes/index.js";
import { AppError } from "./utils/AppError.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";


const app: Application = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', v1Router)

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`localhost running on: ${port}`)
})

export default app