// server
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;
const db = require('./db');
const userRoutes = require('./routes/user');
const rolesRoutes = require('./routes/role');
const permissionsRoutes = require('./routes/permission');

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize.sync({ force: true }).then(async () => {
    console.log("Drop and re-sync db.");
    await db.sequelize.query(`INSERT INTO roles (name) VALUES ('ADMIN')`, { type: db.sequelize.QueryTypes.INSERT });
    await db.sequelize.query("INSERT INTO permissions (name) VALUES ('READ PERMISSION')", { type: db.sequelize.QueryTypes.INSERT });
    await db.sequelize.query("INSERT INTO roles_permissions (name_role, name_permission, is_allowed) VALUES ('ADMIN', 'READ PERMISSION', true)", { type: db.sequelize.QueryTypes.INSERT });
});

// handle cors
const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// parsing request type application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// reduce size body response  -> improve speed
app.use(compression());

// routing
app.use('/users', userRoutes);
app.use('/roles', rolesRoutes);
app.use('/permissions', permissionsRoutes);

app.listen(port, () => {
    console.log('Running on port : ', port);
});