import { Router } from "express";
import { getCategories } from "../controllers/category.controller";

const route = Router();
route.get('/', getCategories);

export default route;