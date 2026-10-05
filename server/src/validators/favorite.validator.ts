import {body} from "express-validator";

export const favoriteValidator = [
    body("listing")
    .notEmpty()
    .trim()
    .isMongoId()
    .withMessage("InValid Listing in Favorite!")
]



