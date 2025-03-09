import express from 'express';
import { create } from '../../controllers/admin/product.controller';
import { verifyUser } from '../../middlewares/auth.middleware';
import { verifyRole } from '../../middlewares/role.middleware';
import { Roles } from '../../common/enums/enums';


const router = express.Router();


router.post('/',verifyUser,verifyRole([Roles.ADMIN]),create)

export default router;