import { Request, Response } from 'express';
import { HomeService } from '../services';
export default class HomeController {
    homeService: HomeService;
    constructor( _homeService: HomeService ) {
        this.homeService=_homeService
    }
    index() : string {
        return this.homeService.index()
    }
}
