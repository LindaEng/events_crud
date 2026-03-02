//configure our db 
const { Sequelize } = require("sequelize");

//create our wrapper
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", //create db in our backend
    logging: false
})

//export 
module.exports = sequelize;