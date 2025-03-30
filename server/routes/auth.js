import express from 'express';
import { register, login } from '../controller/authController.js';
import { verifyToken } from '../middleware/auth.js';


const router  = express.Router();

router .post('/register', register);
router .post('/login', login);

router .get('/dashboard', verifyToken, (req, res) =>{
    res.json({ message: `Welcome ${req.user.name}` });
});

export default router;
