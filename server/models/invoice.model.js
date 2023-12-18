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
            },
            set(value) {
                // Parsear la fecha y establecerla en date_invoice
                console.log(value);
                const parsedDate = new Date(value);
                console.log(parsedDate);
                if (!isNaN(parsedDate.getTime())) {
                    this.setDataValue('date_invoice', parsedDate);
                }
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
            },
            beforeUpdate: async (invoice, options) => {
                // Actualizar date_invoice si formatted_date ha cambiado
                if (invoice.changed('formatted_date')) {
                    const parsedDate = new Date(invoice.formatted_date);
                    console.log(parsedDate);
                    if (!isNaN(parsedDate.getTime())) {
                        invoice.date_invoice = parsedDate;
                    }
                }
            }
        }
    });

    return Invoice;
};
