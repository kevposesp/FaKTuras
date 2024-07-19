const {
    createInvoice,
    getUserInvoices,
    getInvoice,
    createLineInvoice,
    updateInvoice,
    updateLineInvoice,
    deleteLineInvoice,
    deleteInvoice
} = require("../controllers/invoice.controller");
const { verifyToken } = require("../middleware/authJwt");
const { ownerInvoice } = require("../middleware/invoice");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/invoice/list",
        [
            verifyToken
        ],
        getUserInvoices
    )

    app.get(
        "/api/invoice/:id",
        [
            verifyToken,
            ownerInvoice
        ],
        getInvoice
    )

    app.post(
        "/api/invoice/create",
        [
            verifyToken
        ],
        createInvoice
    )

    app.post(
        "/api/invoice/:id/line/create",
        [
            verifyToken,
            ownerInvoice
        ],
        createLineInvoice
    )

    app.put(
        "/api/invoice/:id/line/update",
        [
            verifyToken,
            ownerInvoice
        ],
        updateLineInvoice
    )

    app.put(
        "/api/invoice/:id/update",
        [
            verifyToken,
            ownerInvoice
        ],
        updateInvoice
    )

    app.delete(
        "/api/invoice/:id/line/:lineId/delete",
        [
            verifyToken,
            ownerInvoice
        ],
        deleteLineInvoice
    )
    
    app.delete(
        "/api/invoice/:id",
        [
            verifyToken,
            ownerInvoice
        ],
        deleteInvoice
    )

};