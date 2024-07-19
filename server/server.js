const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config({ path: 'config/.env' });
const db = require("./models");
const dummies = require("./dummies")

db.sequelize.sync(
  {
    force: process.env.FORCE_DB_SYNC === 'true'
  }
).then(() => {
  process.env.ACTIVE_DUMMIES === 'true' ? dummies.createClient() : null
})


var corsOptions = {
  origin: process.env.CORSURL || "http://localhost:4000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// routes
require('./routes/auth.routes')(app);
require('./routes/invoice.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port ${PORT}.`);
});