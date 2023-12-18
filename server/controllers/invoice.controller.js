const db = require("../models");
const Invoice = db.invoice
const InvoiceLine = db.invoiceLine
const { parse } = require('date-fns');

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
            order: [['createdAt', 'DESC'], ['date_invoice', 'DESC']],
            attributes: [
                'id',
                'number_invoice',
                'date_invoice',
                'formatted_date',
                [db.sequelize.literal('(SELECT COALESCE(SUM(price), 0) FROM invoices_lines WHERE invoices_lines.invoices_lines = invoices.id)'), 'totalAmount'],
                'createdAt'
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

const getInvoice = asyncHandler(async (req, res) => {
    try {
        const invoice = await Invoice.findOne({
            where: { id: req.params.id },
            include: [{ model: InvoiceLine, as: "invoices_lines" }]
        });

        if (!invoice) {
            return res.status(404).json({ success: false, error: "Invoice not found" });
        }

        const totalAmount = await InvoiceLine.sum('price', {
            where: { invoices_lines: req.params.id }
        });

        const invoiceWithTotalAmount = {
            ...invoice.toJSON(),
            totalAmount
        };

        res.status(200).json({ success: true, invoice: invoiceWithTotalAmount });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const createLineInvoice = asyncHandler(async (req, res) => {
    try {
        const { accident_number, description, job, price } = req.body
        const invoiceLine = await InvoiceLine.create({
            accident_number,
            description,
            job,
            price,
            invoices_lines: req.params.id
        })

        res.status(201).json({
            success: true,
            invoiceLine
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

const updateLineInvoice = asyncHandler(async (req, res) => {
    let invoiceLine = await InvoiceLine.findByPk(req.body.id)
    if (!invoiceLine) {
        return res.status(404).json({ success: false, error: "Invoice not found." });
    }
    line = await invoiceLine.update(req.body)
    line = await invoiceLine.save();

    res.status(200).json({ success: true, data: line })
})

const updateInvoice = asyncHandler(async (req, res) => {
    let invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
        return res.status(404).json({ success: false, error: "Invoice not found." });
    } else {

        req.body.formatted_date = parse(req.body.formatted_date, 'dd/MM/yyyy', new Date());

        invoice = await invoice.update(req.body);

        invoice = await invoice.save();

        res.json({ success: true, data: invoice });
    }
});

const deleteLineInvoice = asyncHandler(async (req, res) => {
    const invoiceLine = await InvoiceLine.destroy({ where: { id: req.params.lineId } });
    if (!invoiceLine) {
        return res.status(404).json({ success: false, error: "Line is not found!" });
    }
    res.json({ success: true, message: "Deleted Successfully" })
})

const invoiceController = {
    createInvoice,
    getUserInvoices,
    getInvoice,
    createLineInvoice,
    updateLineInvoice,
    updateInvoice,
    deleteLineInvoice
}

module.exports = invoiceController