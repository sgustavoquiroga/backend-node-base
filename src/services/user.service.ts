import BaseService from '../services/base.service';
import { container }  from '../containers/container';

class UserService extends BaseService {
    _UserRepository: any;
    constructor() {
      const userRepository = container.resolve('userRepository');
      super(userRepository);
      this._UserRepository = userRepository;
    }
    // here custom method
    async createUser(data: any){
      const user = await this._UserRepository.createUser(data);
      return user;
    }
}
export default UserService;