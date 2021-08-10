import { createContainer, asClass, asValue, asFunction , InjectionMode}  from 'awilix';

// services
 import {
         HomeService,
         UserService,
        } from '../services';

 // repositories
 import {
         UserRepository
        } from '../repositories';

// Create container
const container = createContainer({
    injectionMode: InjectionMode.PROXY
});

// Register class/functions/values
function setup(){
    container.register({
         homeService: asClass(HomeService),
         userService: asClass(UserService),
    }).register({
        userRepository: asClass(UserRepository),
    });
 }
export {
    container,
    setup
}