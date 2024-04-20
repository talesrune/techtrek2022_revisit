const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('multicurrency', 'root', '123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    dialectOptions:{
        connecTimeout:10000,
        timezone:'+08:00'
    },
    pool:{
        max:5,
        min:0,
        acquire:10000,
        idle:10000
    },
    logging:console.log,
    define:{
        freezeTableName:true,
    }
});

export default sequelize;