import express from 'express';
import { findAll, findById, } from '../controllers/web/product.controller';



const router = express.Router();

router.get('/:id',findById)
router.get('/',findAll)

export default router;