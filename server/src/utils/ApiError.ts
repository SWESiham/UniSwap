import {Response} from 'express';
export const ApiError = (res:Response,err:number | any,fallback:string) =>{
    //status code
    if (typeof err === "number")
        return res.status(err).json({ message: fallback });
    // error 
    return res.status(err?.status || 500).json({
        message:err.status ? err.message : fallback
    })
}