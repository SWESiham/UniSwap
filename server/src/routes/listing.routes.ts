import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import { cListing,rOneListing ,sListing,uListing,dListing} from "../controllers/listing.controller";


const route = Router();
route.post('/', authenticate, authorizeRole('seller'), cListing);
route.get('/:id', rOneListing);
route.patch('/:id/sold', authenticate, authorizeRole('seller'), sListing);
route.patch('/:id', authenticate, authorizeRole('seller'), uListing);
route.delete('/:id', authenticate, authorizeRole('seller'), dListing);



export default route;