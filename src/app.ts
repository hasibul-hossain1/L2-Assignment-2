import express, { Request, Response } from "express"
import apiRoutes from './routes'

const app=express()

app.use(express.json())

app.get("/",(req:Request,res:Response) => {
    res.send("The server is working.")
})

app.use('/api/v1',apiRoutes)



app.use((req:Request,res:Response,next)=>{
    res.status(404).send({
        success:false,
        message:"Route not found",
        path:req.path,
    })
})

export default app