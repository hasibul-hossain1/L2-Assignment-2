import express, { Request, Response } from "express"
import apiRoutes from './routes'

const app=express()

app.use(express.json())
app.use((req:Request,res:Response,next)=>{
    console.log(`The server got hit on path: ${req.path}`);
    next()
})

app.use('/api/v1',apiRoutes)

app.get("/",(req:Request,res:Response) => {
    res.send("The server is working.")
})

export default app