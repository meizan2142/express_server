import express, { NextFunction, Request, Response } from "express"
import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todos/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express()
const port = config.port
app.use(express.json());
// app.use(express.urlencoded())

// * Initializing DB
initDB();

// * Root Route
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Express Server')
})

// * USERS - CRUD Operation
app.use("/users", userRoutes)
app.use("/users/:id", userRoutes)

// * TODOS - CRUD Operation
app.use("/todos", todoRoutes);
app.use("/todos/:id", todoRoutes);

//  * Auth Routes
app.use("/auth", authRoutes)

// * 404 route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
