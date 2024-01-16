module.exports = (sequelize, Sequelize) => {
    const InvoiceLine = sequelize.define("invoices_lines", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        accident_number: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        job: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2)
        }
    });
    return InvoiceLine;
};