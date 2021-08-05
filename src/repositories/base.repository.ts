import { IntegerDataType } from "sequelize/types";

class BaseRepository {
    model :any;
   constructor(model:any) {
       this.model = model;
   }
   async get( id:number ){
       return await this.model.findByPk(id);
   }
   async getAll(){
    return await this.model.findAll();
   }
   async build( entity:any ){
    return await this.model.build(entity);
   }
   async update( entity:any ){
    return await this.model.update(entity);
   }
   async delete(){
    return await this.model.destroy();
   }
}

export default BaseRepository;