import { Router } from "express";
import {getmarketPlacesController 
, searchmarketPlacesController
, filtermarketPlacesController,
sortmarketPlacesContrlloer} from "../controllers/marketplace.controller.js";
export const routerMarketplaces = Router();

routerMarketplaces.get("/",getmarketPlacesController);
routerMarketplaces.get("/search",searchmarketPlacesController);
routerMarketplaces.get("/filter",filtermarketPlacesController);
routerMarketplaces.get("/sort", sortmarketPlacesContrlloer);
