import dotenv from "dotenv"

dotenv.config()

export const config={
    port:process.env.PORT,
    connection_string:process.env.CONNECTION_STRING,
    jwt_secret:process.env.JWT_SECRET
}
