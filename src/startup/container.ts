
import { createContainer, asClass, asValue, asFunction , InjectionMode}  from 'awilix';

// services
 import { HomeService } from '../services';

// Create the container
const container = createContainer({
    injectionMode: InjectionMode.PROXY
});

function setup(){
    container.register({
         homeService: asClass(HomeService),
    });
    /*.register({
        // HomeController: asClass(HomeController.bind(HomeController)),
    });
    */
    /*.register({
        HomeRoutes: asFunction(HomeRoutes),
    });*/
 }
export {
    container,
    setup
}