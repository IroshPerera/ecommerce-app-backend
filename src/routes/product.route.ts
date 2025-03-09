import express from 'express';
import { findById } from '../controllers/admin/product.controller';



const router = express.Router();

router.get('/:id',findById)

export default router;