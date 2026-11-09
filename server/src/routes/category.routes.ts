import { Router } from "express";
import { gCatById, getCategories } from "../controllers/category.controller";

const route = Router();
route.get('/', getCategories);
route.get("/:id", gCatById);
export default route;