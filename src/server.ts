import express, { NextFunction, Request, Response } from "express"
import config from "./config";
import initDB, { pool } from "./config/db";
import { logger } from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todos/todo.routes";

const app = express()
const port = config.port
app.use(express.json());
// app.use(express.urlencoded())

// * Initializing DB
initDB();

// * Main Route
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Express Server')
})

// * CRUD Operation

// * POST & GET Method
app.use("/users", userRoutes)

// * UPDATE & DELETE
app.use("/users/:id", userRoutes)


// * TODOS - CRUD Operation
// * POST Method
app.use("/todos", todoRoutes);


// * Get single todo
app.get("/todos/:id", todoRoutes);

// * Update todo
app.put("/todos/:id", todoRoutes);

// * Delete todo
// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const result = await pool.query(
//             "DELETE FROM todos WHERE id=$1 RETURNING *",
//             [req.params.id]
//         );

//         if (result.rowCount === 0) {
//             return res.status(404).json({ error: "Todo not found" });
//         }

//         res.json({ success: true, message: "Todo deleted", data: null });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Failed to delete todo" });
//     }
// });


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
