import express, { type Application } from "express";
import router from "./routes/index.js";
import { AppError } from "./utils/AppError.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app: Application = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/v1', v1Router)
// app.use("/api/v1/auth", toNodeHandler(auth));
app.use("/api/v1/auth", (req, res, next) => {
    console.log("AUTH HIT:", req.method, req.url);
    next();
}, toNodeHandler(auth));

app.use('/api/v1', router)


app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`localhost running on: ${port}`)
})

export default app