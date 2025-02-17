import express from 'express'
import bodyParser from 'body-parser'
import authRouter from './routes/auth.js'
//import itemModel from './models/item.js'
import cors from 'cors'

import connectToDatabase from './database/db.js'

const app = express()
app.use(cors())
app.use(express.json())     

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/auth', authRouter)

connectToDatabase()

app.listen(process.env.PORT,() =>{
    console.log(`app is running from port ${process.env.PORT}`)
} )
