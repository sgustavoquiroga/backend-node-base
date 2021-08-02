import { DataTypes } from 'sequelize';
import db from '../config/connection';

const Usuario = db.define ('usuario',{
    nombre:{
        type: DataTypes.STRING,
        field: "nombre",
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    img:{
        type: DataTypes.STRING
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER',
        validate: {
            isIn: {
                args: [['ADMIN', 'USER']],
                msg: "Rol no valido"
            }
        }
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

});

export default Usuario;