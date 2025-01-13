import express from 'express'

import {login} from '../controllers/authController.js'

const router = express.Router()

router.post('/Login',login)

export default router