const { createInvoice, getUserInvoices } = require("../controllers/invoice.controller");
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

    app.post(
        "/invoice/create",
        [
            verifyToken
        ],
        createInvoice
    )

};