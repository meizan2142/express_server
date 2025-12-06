import express, { Request, Response } from "express"


const app = express()
const port = 5000
app.use(express.json());
// app.use(express.urlencoded())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World - Rizwan Wahid Mehrab Rayan Marzia!')
})

// * Post Method
app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({
        success: true,
        message: "API is working",
        body: req?.body
    })
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
