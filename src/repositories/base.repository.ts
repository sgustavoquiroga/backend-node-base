class BaseRepository {
    private model: any;
    constructor (currentModel:any) {
        this.model = currentModel;
    }
    async get(id: string){
        const usuario = await this.model.findByPk( id );
        // si existe
        if (usuario) {
           return(usuario);
        }else{
          return null;
        }
    }
    async getAll(limite=10, pagina=0){
        const usuarios = await this.model.findAll({
            where: {
                estado: true
            },
            limit: Number(limite),
            offset: Number(pagina)
          });
        return usuarios;
    }
    async count(){
        return this.model.count();
    }
    async create(data: any){
        const usuario = await this.model.create(data);
        try {
            // Guardar en BD
            await usuario.save();
           return usuario;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async update(id: string, data:any){
        try
        {
            const usuario = await this.model.findByPk ( id );
            if (!usuario){
                console.log(`Usuario no encontrado, Id: ${ id }`);
                return null;
            }
            await usuario.update(data);
            return usuario;
        } catch (error) {
                console.log(error);
                return null;
        }
    }
    async delete(id: string){
        try
        {
            const usuario = await this.model.findByPk ( id );
            if (!usuario){
                console.log(`Usuario no encontrado, Id: ${ id }`);
                return null;
            }
            // await usuario.destroy();
            await usuario.update ({
                estado: false
            });
            return usuario;
        } catch (error) {
                console.log(error);
                return null;
        }

    }
}
export default BaseRepository;