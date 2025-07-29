import { env } from "../config/env.config"
export default function  validateEnv(){
    if(!env.PORT){
        throw new Error('PORT is Not defined in env')
    }
    if(!env.MONGODB_URL){
        throw new Error("MongoDB URL is not defined in the env")
    }
     if (!env.JWT_SECRET) {
        throw new Error('JWT_Secret is not defined in env')
    }
    if (!env.JWT_REFRESH_SECRET) {
        throw new Error('REFRESH_SECRET is not defined in env')
    }
    if (!env.BASE_URL) {
        throw new Error('CLIENT_URL is not defined in env')
    }
}