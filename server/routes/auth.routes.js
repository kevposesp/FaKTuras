const { signin, infoUser, refreshToken } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authJwt");
const { enableLog } = require("../middleware/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signin",
        [
            enableLog
        ],
        signin
    );

    app.post(
        "/api/auth/info",
        [
            verifyToken
        ],
        infoUser
    );

    app.post(
        "/api/auth/refreshtoken",
        [
            verifyToken
        ],
        refreshToken
    )
};