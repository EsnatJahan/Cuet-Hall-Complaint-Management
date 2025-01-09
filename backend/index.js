//mongodb+srv://esnat:<db_password>@cluster0.2pzar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import express from 'express'
//import itemModel from './models/item.js'
import cors from 'cors'

//import connectDB from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

//connectDB()

app.listen(3000,() =>{
    console.log('app is running from port 3000')
} )
