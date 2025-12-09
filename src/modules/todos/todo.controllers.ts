import { Request, Response } from "express";
import { todoServices } from "./todo.services";

const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await todoServices.createTodo(user_id, title)
        res.status(201).json({
            success: true,
            message: "Todo created",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getTodo();

        res.status(200).json({
            success: true,
            message: "todos retrieved successfully",
            data: result.rows,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err,
        });
    }
}

const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getSingleTodo(req.params.id!)

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch todo" });
    }
}

const updateSingleTodo = async (req: Request, res: Response) => {
    const { title, completed } = req.body;

    try {
        const result = await todoServices.updateSingleTodo(title, completed, req.params.id as string)

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
}

const deleteSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.deleteSingleTodo(req.params.id!)

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ success: true, message: "Todo deleted", data: null });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete todo" });
    }
}

export const todoControllers = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateSingleTodo,
    deleteSingleTodo
}