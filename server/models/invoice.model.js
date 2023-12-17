const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoices", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        number_invoice: {
            type: Sequelize.INTEGER
        },
        date_invoice: {
            type: Sequelize.DATE
        },
        formatted_date: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.getDataValue('date_invoice').toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: "Europe/Madrid" 
                });
            }
        }
    }, {
        hooks: {
            beforeCreate: async (invoice, options) => {
                // Buscar la última factura con el número de factura más alto
                const lastInvoice = await Invoice.findOne({
                    attributes: ['number_invoice'],
                    order: [['number_invoice', 'DESC']],
                    raw: true
                });

                let newInvoiceNumber = 1;

                // Si hay una factura existente, incrementar el número de factura
                if (lastInvoice) {
                    newInvoiceNumber = lastInvoice.number_invoice + 1;
                }

                // Asignar el nuevo número de factura y la fecha actual
                invoice.number_invoice = newInvoiceNumber;
                invoice.date_invoice = new Date();
            }
        }
    });

    return Invoice;
};