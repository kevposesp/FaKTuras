module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        nombre: {
            type: Sequelize.STRING
        },
        tel: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        enableLog: {
            type: Sequelize.BOOLEAN
        },
        status: {
            type: Sequelize.INTEGER
        }
    });
    return User;
};