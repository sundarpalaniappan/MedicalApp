const mongoose = require('mongoose');
const config = require('../config');


const dbConnect = function dbConnect() {
	if (config.env === 'test') {
		mongoose.connect('mongodb://localhost/medappAPI_Test', { useNewUrlParser: true });
	} else {
		mongoose.connect('mongodb://localhost/medappAPI', { useNewUrlParser: true });
	}
};

module.exports = dbConnect;
