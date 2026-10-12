// import type { Response, NextFunction } from "express";
// import type { AuthRequest } from "../middlewares/auth.middleware.js";
// import responseHandler from "../utils/asyncHandler.js";

// import {
//   addFavorite,
//   deleteFavorite,
//   getFavorites
// } from "../services/favorite.service.js";


// // ADD Favourite
// export const addFavoriteController = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user) {
//       return responseHandler(
//         res,
//         401,
//         "User Not Found!"
//       );
//     }

//     const idAuth = req.user.id;
//     const { listing } = req.body;

//     const newFav = await addFavorite(idAuth, listing);

//     if (newFav) {
//       return responseHandler(
//         res,
//         201,
//         "Favourite Created Successfully!",
//         newFav
//       );
//     }

//     return responseHandler(
//       res,
//       409,
//       "Favourite Already Exists!"
//     );

//   } catch (error) {
//     next(error);
//   }
// };


// // DELETE Favourite
// export const deleteFavoriteController = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user) {
//       return responseHandler(
//         res,
//         401,
//         "User Not Found!"
//       );
//     }

//     const idAuth = req.user.id;
//     const { listing } = req.body;

//     const deleted = await deleteFavorite(
//       idAuth,
//       listing
//     );

//     if (!deleted) {
//       return responseHandler(
//         res,
//         404,
//         "Favourite Not Exists!"
//       );
//     }

//     return responseHandler(
//       res,
//       200,
//       "Favourite is Deleted Successfully!"
//     );

//   } catch (error) {
//     next(error);
//   }
// };


// // GET Favourite
// export const getFavoritesController = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user) {
//       return responseHandler(
//         res,
//         401,
//         "User Not Found!"
//       );
//     }

//     const idFavUser = req.user.id;

//     const favorites = await getFavorites(idFavUser);

//     return responseHandler(
//       res,
//       200,
//       "Favorites Retrieved Successfully!",
//       favorites
//     );

//   } catch (error) {
//     next(error);
//   }
// };


