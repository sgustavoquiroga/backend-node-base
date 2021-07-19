import { createContainer, asClass, asValue, asFunction }  from 'awilix';

// services
import { HomeService } from '../services';

// controllers
import { HomeController } from '../controllers';


const container = createContainer();

container.register({
    HomeService: asClass(HomeService).singleton()

}).register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton()
});



export default container;