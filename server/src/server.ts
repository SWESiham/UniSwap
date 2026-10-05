import "dotenv/config";
import app  from "./app";
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;
connectDB()
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server on ${PORT}`)))
    .catch((err) => {
        console.error(err);
        process.exit(1);
})