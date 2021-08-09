import UserRepository from '../repositories/user.repository';

class UserService {
    repository: any;
    constructor() {
      this.repository = UserRepository;
    }
    async get(id:string) {
        if ( !id ) {
            const error = new Error();
            error.message = "id must by send";
            throw error;
        }
        const currentEntity = await this.repository.get(id);
        if ( !currentEntity ) {
            const error = new Error();
            error.message = "entity does not faund";
            throw error;
        }
      return currentEntity;
    }

    async getAll() {
        const entities = await this.repository.getAll();
        if ( !entities ) {
            const error = new Error();
            error.message = "not found";
            throw error;
        }
      return entities;
    }

    async create(data:any) {
        const entities = await this.repository.create(data);
        if ( !entities ) {
            const error = new Error();
            error.message = "not created";
            throw error;
        }
      return entities;
    }

    async update(id:string, data:any) {
        if ( !id ) {
            const error = new Error();
            error.message = "id must by send";
            throw error;
        }
        const currentEntity = await this.repository.update(id,data);
        if ( !currentEntity ) {
            const error = new Error();
            error.message = "entity does not updated";
            throw error;
        }
      return currentEntity;
    }

    async delete(id:string) {
        if ( !id ) {
            const error = new Error();
            error.message = "id must by send";
            throw error;
        }
        const currentEntity = await this.repository.delete(id);
        if ( !currentEntity ) {
            const error = new Error();
            error.message = "entity does not deleted";
            throw error;
        }
      return currentEntity;
    }
}
export default UserService;