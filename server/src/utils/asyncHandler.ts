import {type Response } from "express";

const responseHandler = (
    res: Response,
    statusCode: number,
    message: string,
    data: unknown = null
) => {
    const isSuccess =
        statusCode >= 200 && statusCode < 300;

    return res.status(statusCode).json({
        success: isSuccess,
        message,
        statusCode,
        data,
        timestamp: new Date().toISOString(),
    });
};

export default responseHandler;