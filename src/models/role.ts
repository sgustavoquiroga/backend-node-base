import { DataTypes } from 'sequelize';
import db from '../config/connection';

const Role = db.define ('Role',{
    rol:{
        type: DataTypes.STRING,
        field: "rol",
        allowNull: false
    }
});

export default Role;