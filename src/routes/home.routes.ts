import { Router } from 'express';

const HomeRoutes = ({ HomeController })=>{
    const router = Router();
    router.get("/", HomeController.index);
    return router;
}
export default HomeRoutes;




