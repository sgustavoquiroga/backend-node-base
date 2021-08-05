import { Router } from 'express';
import  HomeConroller  from  '../controllers/home.controller';

const  router = Router();
router.get("/", HomeConroller.index);

export default router;




