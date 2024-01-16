const db = require("../models");
const User = db.user;
var bcrypt = require("bcryptjs");

createClient = async () => {
    await User.create({
        name: "user",
        tel: 666666666,
        username: "user",
        password: await bcrypt.hash("1234", 10),
        enableLog: true,
        status: 1
    })
    await User.create({
        name: "kevin",
        tel: 666666666,
        username: "kevin",
        password: await bcrypt.hash("1234", 10),
        enableLog: true,
        status: 1
    })
}

const dummiesController = {
    createClient
}

module.exports = dummiesController