import { Request, Response } from 'express';
import { container }  from '../startup/container';
class HomeController {
    homeService: any;
    index( req: Request, res: Response ){
      // se inyecta el servicio
      const homeService = container.resolve('homeService');
      res.status(404).json({
       msg: homeService.index()
      });
    }
}
export default new HomeController()