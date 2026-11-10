import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import { cListing,rOneListing ,sListing,uListing,dListing, rUserListing} from "../controllers/listing.controller";


const route = Router();
route.get("/user/:id", authenticate, authorizeRole('seller'), rUserListing);
route.get('/:id', authenticate, authorizeRole('seller'), rOneListing);
route.post('/', authenticate, authorizeRole('seller'), cListing);
route.patch('/:id/sold', authenticate, authorizeRole('seller'), sListing);
route.patch('/:id', authenticate, authorizeRole('seller'), uListing);
route.delete('/:id', authenticate, authorizeRole('seller'), dListing);


export default route;