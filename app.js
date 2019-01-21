const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const swaggerUI = require('swagger-ui-express');
const config = require('./config');
const router = require('./Routes/medapproutes')();
const swaggerDocument = require('./swagger.json');
require('./database/index')();

const app = express();
const { port } = config;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
	debug(`listening on port ${chalk.green(port)}`);
});
