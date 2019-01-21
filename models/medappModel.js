const mongoose = require('mongoose');

const { Schema } = mongoose;


const medicineSchema = new Schema({
	name: { type: String },
	code: { type: String },
	quantity: { type: Number },
});

module.exports = mongoose.model('Medicine', medicineSchema);
