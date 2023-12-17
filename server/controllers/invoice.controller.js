const db = require("../models");
const Invoice = db.invoice
const InvoiceLine = db.invoiceLine

const asyncHandler = require("express-async-handler");

const createInvoice = asyncHandler(async (req, res) => {
    try {
        const newInvoice = await Invoice.create({
            ownerId: req.userId
        });
        res.status(201).json({ success: true, data: newInvoice });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const getUserInvoices = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const offset = (page - 1) * pageSize;

        const userInvoices = await Invoice.findAll({
            where: { ownerId: req.userId },
            order: [['date_invoice', 'DESC']],
            attributes: [
                'id',
                'number_invoice',
                'date_invoice',
                'formatted_date',
                [db.sequelize.literal('(SELECT COALESCE(SUM(price), 0) FROM invoices_lines WHERE invoices_lines.fk_invoice = invoices.id)'), 'totalAmount']
            ],
            include: [
                { model: InvoiceLine, attributes: [] }
            ],
            group: ['invoices.id'],
            limit: pageSize,
            offset: offset
        });

        const totalCount = await Invoice.count({ where: { ownerId: req.userId } });
        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({
            success: true,
            totalCount,
            count: userInvoices.length,
            totalPages: totalPages,
            currentPage: page,
            data: userInvoices
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


const invoiceController = {
    createInvoice,
    getUserInvoices
}

module.exports = invoiceController