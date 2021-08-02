import { Sequelize } from 'sequelize';
const db = new Sequelize('oficinavirtual', 'root','', { // dbnome, user, pass
        host: '127.0.0.1',
        dialect: 'mysql',
        port:3307
});
db.authenticate().then(() => {
    console.log('Connection to the database established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
export default db;