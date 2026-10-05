import type { ParsedQs } from "qs";
import ListingSchema  from "../models/Listing.js";


export const getAllListing =async(
    isApprovedListining:boolean , 
    statuslistinig:'active' | 'sold' | 'deleted',
    page: number,
    limit: number)=>
{
   const getmarketPlaces = await ListingSchema.find({
    isApproved:isApprovedListining,
    status:statuslistinig
 })
  .skip((page - 1) * limit)
  .limit(limit);

 return getmarketPlaces;
}


export const searchListings = async(
    isApprovedListining:boolean , 
    statuslistinig:'active' | 'sold' | 'deleted',
    q:string
)=>{
    const searchmarketPlaces = await ListingSchema.find({
    isApproved:isApprovedListining,
    status:statuslistinig,
    $or:[
        {title:{$regex:q , $options:"i"}},
        {brand:{$regex:q , $options:"i"}}
    ]
    });
    return searchmarketPlaces;
}


export const filterListings = async(
    Category?:string,
    minPrice?:number,
    maxPrice?:number,
    Condition?: "new"|"like_new"|"very_good"|"good"|"acceptable",
    Sale?:'sell'| 'exchange',
    Faculty?:string|"",
    Department?:string|"",
)=>{

   
  const filters: any = {
    isApproved: true,
    status: "active"
  };

  if (Category) {
    filters.category = Category;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.price = {};

    if (minPrice !== undefined) {
      filters.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filters.price.$lte = maxPrice;
    }
  }

  if (Condition) {
    filters.condition = Condition;
  }

  if (Sale) {
    filters.type = Sale;
  }

  if (Faculty) {
    filters.faculty = Faculty;
  }

  if (Department) {
    filters.department = Department;
  }
    const filtermarketPlaces = await ListingSchema.find(filters);
    return filtermarketPlaces;
}


export const sortListings = async(sort: string)=>{
      if (sort === "newest") {
    const sortedListings  = await ListingSchema.find({
        isApproved:true,
        status:"active"
    }).sort({
        createdAt:-1
    });

    return sortedListings;
}
return [];
}



