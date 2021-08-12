import { Request, Response, NextFunction } from 'express';
import  mcache  from 'memory-cache';
// import memoryCache, { CacheClass } from 'memory-cache';

export default ()=> {
    const caheKey = process.env.CACHE_KEY || 'myOficinaAguasPassword';
    return (req : any, res : any, next: any )=>{
        const key = caheKey + req.originalUrl || req.url;
        const cachedBody = mcache.get(key);
        // if there cache
        if (cachedBody) {
            return res.send(JSON.parse(cachedBody));
        }else{
            res.sendResponse = res.send;
            res.send = (body:any) =>{
                mcache.put(key , body , 1000);
                res.sendResponse(body);
            };
            next();
        }
    }

}
