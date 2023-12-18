const {
    createInvoice,
    getUserInvoices,
    getInvoice,
    createLineInvoice,
    updateInvoice,
    updateLineInvoice,
    deleteLineInvoice
} = require("../controllers/invoice.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/invoice/list",
        [
            verifyToken
        ],
        getUserInvoices
    )

    app.get(
        "/invoice/:id",
        [
            verifyToken
        ],
        getInvoice
    )

    app.post(
        "/invoice/create",
        [
            verifyToken
        ],
        createInvoice
    )

    app.post(
        "/invoice/:id/line/create",
        [
            verifyToken
        ],
        createLineInvoice
    )

    app.put(
        "/invoice/:id/line/update",
        [
            verifyToken
        ],
        updateLineInvoice
    )

    app.put(
        "/invoice/:id/update",
        [
            verifyToken
        ],
        updateInvoice
    )

    app.delete(
        "/invoice/:id/line/:lineId/delete",
        [
            verifyToken
        ],
        deleteLineInvoice
    )

};