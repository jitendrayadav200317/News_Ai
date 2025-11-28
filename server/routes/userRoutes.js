import express from 'express'

import { login , register } from '../controllers/authControllers.js'

const userRoutes = express.Router();
userRoutes.post('/register', register)

export default userRoutes;