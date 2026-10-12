import dotenv from "dotenv";
import type { StringValue } from "ms";
dotenv.config();

export const env={
    mongoUri: process.env.MONGO_URI??"",

    jwtAccessSecret: process.env.ACCESS_TOKEN??"",

    jwtRefreshSecret: process.env.REFRESH_TOKEN??"",

    PORT:Number(process.env.PORT)||5000,

    Secret_Key:process.env.JWT_SECRET??"",

    
    JWT_ACCESS_EXPIRES_IN:
        (process.env.JWT_ACCESS_EXPIRES_IN ?? "") as StringValue,

    JWT_REFRESH_EXPIRES_IN:
        (process.env.JWT_REFRESH_EXPIRES_IN ?? "") as StringValue,

    RESET_PASSWORD_EXPIRES_IN:
        (process.env.RESET_PASSWORD_EXPIRES_IN ?? "") as StringValue,
}
