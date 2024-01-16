const db = require("../models");
const Invoice = db.invoice

const ownerInvoice = async (req, res, next) => {
    try {
        const userId = req.userId
        const invoiceId = req.params.id
        const invoice = await Invoice.findOne({
            where: { id: invoiceId }
        })
        if (invoice.ownerId == userId) {
            next()
        } else {
            return res.status(401).send({ error: 'You are not the owner of this invoice' })
        }
    } catch (err) {
        res.status(403).send({
            message: err
        })
    }

}

const invoiceMiddleware = {
    ownerInvoice
};

module.exports = invoiceMiddleware;