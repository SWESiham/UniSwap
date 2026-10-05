import {env} from  "./config/env.config.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const port = env.PORT;

const start = async () => {
  try {
         await connectDB();
 
         app.listen(port, () => {
             console.log(
                 
  `UniSwap server running on http://localhost:${port}`
             );
         });
 
     } catch (error) {
         console.error(
             "Failed to start server:",
             error
         );
     }
};

start();
