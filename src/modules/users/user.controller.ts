import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userServices.createUser(name, email)
        res.status(201).json({
            success: true,
            message: "Data inserted successfully!",
            data: result.rows[0]
        })
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully, yaa",
            data: result.rows
        })
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateSingleUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userServices.updateSingleUser(name, email, req.params.id!);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteSingleUser(req.params.id!)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}