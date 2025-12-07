import express, { Request, Response } from "express"
import apiRoutes from './routes'

const app=express()

app.use(express.json())

app.use('/api/v1',apiRoutes)

app.use((req:Request,res:Response,next)=>{
    res.status(404).send({
        success:false,
        message:"Unknown api route",
        path:req.path,
    })
})
app.get("/",(req:Request,res:Response) => {
    res.send("The server is working.")
})

export default app