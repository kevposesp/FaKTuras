const db = require("../models");
const Invoice = db.invoice

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

const invoiceController = {
    createInvoice
}

module.exports = invoiceController