const { Op } = require("sequelize");
// const { sequelize } = require("../models");
const db = require("../models");

const User = db.user

const enableLog = async (req, res, next) => {

    try {
        const { user } = req.body
        await User.findOne({
            where: {
                [Op.and]: [
                    { username: user },
                    { enableLog: true }
                ]
            }
        }).then(user => {
            if (user) {
                next()
            } else {
                res.status(403).send({
                    message: "err_log"
                })
            }
        })
    } catch (err) {
        res.status(403).send({
            message: err
        })
    }

}

const authMiddleware = {
    enableLog
};

module.exports = authMiddleware;