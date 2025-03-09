import express from 'express';
import { create } from '../../controllers/admin/product.controller';
import { verifyUser } from '../../middlewares/auth.middleware';


const router = express.Router();


router.post('/',verifyUser,create)

export default router;