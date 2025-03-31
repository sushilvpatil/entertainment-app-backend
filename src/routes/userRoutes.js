import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { updateUserProfile } from '../controllers/userController.js';
const router = express.Router();


  router.get('/profile', authMiddleware, (req, res) => {
res.json({message: "User Profile", user: req.user});
});

router.put("/update", authMiddleware, updateUserProfile);

export default router;