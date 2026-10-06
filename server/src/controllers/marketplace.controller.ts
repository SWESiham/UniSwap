import {getAllListing ,
     searchListings,
    filterListings,
sortListings} from "../services/marketplace.service.js";
import responseHandler from "../utils/asyncHandler.js";
import type {Request, Response, NextFunction } from "express";



 // GET MarketPlaces

 export const getmarketPlacesController = async(
    req:Request,
    res:Response,
    next:NextFunction
 )=>{
    try{
        const { page, limit } = req.query;

        const pageNumber = page ? Number(page) : 1;
        const limitNumber = limit ? Number(limit) : 10;

    const marketPlaces = await getAllListing(
        true , 
        "active",
        pageNumber,
        limitNumber);
    return responseHandler(
        res,
        200,
        "MarketPlaces Retrived Successfully!",
        marketPlaces 
    )
 }

 catch (error) {
    next(error);
  }
}


 // Search MarketPlaces
 export const searchmarketPlacesController = async(
    req:Request,
    res:Response,
    next:NextFunction
 )=>{
    try{
        const {q} = req.query;
        if(!q || typeof q !=="string"){
            return responseHandler(
                res,
                400,
                "Query is Not String in Search MarketPlaces!",
            )
        }
    
    const searchMarketPlaces = await searchListings(true , "active" , q);
    return responseHandler(
        res,
        200,
        "Search MarketPlaces Retrived Successfully!",
        searchMarketPlaces 
    )
 }

 catch (error) {
    next(error);
  }
}



 // Filter MarketPlaces

 export const filtermarketPlacesController = async(
    req:Request,
    res:Response,
    next:NextFunction
 )=>{
    try{
        const {
            category,
            minPrice,
            maxPrice,
            condition,
            type,
            faculty,
            department} = req.query;
    
    const filterMarketPlaces = await filterListings(
             typeof category === "string" ? category : undefined,

            typeof minPrice === "string"
                ? Number(minPrice)
                : undefined,

            typeof maxPrice === "string"
                ? Number(maxPrice)
                : undefined,

            typeof condition === "string"
                ? condition as "new" | "like_new" | "very_good" | "good" | "acceptable"
                : undefined,

            typeof type === "string"
                ? type as "sell" | "exchange"
                : undefined,

            typeof faculty === "string"
                ? faculty
                : undefined,

            typeof department === "string"
                ? department
                : undefined);
    return responseHandler(
        res,
        200,
        "Filter MarketPlaces Retrived Successfully!",
        filterMarketPlaces 
    )
 }

 catch (error) {
    next(error);
  }
}


 // Sort MarketPlaces

 export const sortmarketPlacesContrlloer = async(
     req:Request,
    res:Response,
    next:NextFunction
 )=>{
    try{
        const {sort} = req.query;
        if(typeof sort !=="string"){
            return responseHandler(
        res,
        400,
        "Invalid sort value!"
    );
        }
        const sortmarketPlaces = await sortListings(sort);
        return responseHandler(
        res,
        200,
        "Sort MarketPlaces Retrived Successfully!",
        sortmarketPlaces 
        )
        }

        
 catch (error) {
    next(error);
  }

 }













