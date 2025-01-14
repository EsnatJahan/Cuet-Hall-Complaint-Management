import express from 'express'
import authRouter from './routes/auth.js'
//import itemModel from './models/item.js'
import cors from 'cors'

import connectToDatabase from './database/db.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

connectToDatabase()

app.listen(process.env.PORT,() =>{
    console.log(`app is running from port ${process.env.PORT}`)
} )
