const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.invoice = require("./invoice.model.js")(sequelize, Sequelize)
db.invoiceLine = require("./line-invoice.model.js")(sequelize, Sequelize)

// RefreshToken
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});

db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// User and Invoice association
db.invoice.belongsTo(db.user, { as: "owner", foreignKey: "ownerId" });
db.user.hasMany(db.invoice, { as: "ownedInvoices", foreignKey: "ownerId" });

// Invoice and LineInvoice association
db.invoice.hasMany(db.invoiceLine, { foreignKey: 'invoices_lines', onDelete: 'CASCADE' })
db.invoiceLine.belongsTo(db.invoice, { foreignKey: "invoices_lines", onDelete: 'CASCADE' })

module.exports = db;