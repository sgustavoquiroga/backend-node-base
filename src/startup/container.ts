// import express from 'express';
//  import { scopePerRequest } from 'awilix-express';
import { createContainer, asClass, asValue, asFunction , InjectionMode}  from 'awilix';

// services
import { HomeService } from '../services';

// controller
import { HomeController } from '../controllers';

// rutas
import  { HomeRoutes }  from '../routes/index.routes';

/*export default (app: express.Application)=> {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        homeService: asClass(HomeService).scoped()
    });
    app.use(scopePerRequest(container));
};*/
// Create the container
const container = createContainer();

container.register({
    homeService: asClass(HomeService).classic(),
}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
}).register({
    homeRoutes: asFunction(HomeRoutes).singleton()
});

export default container;