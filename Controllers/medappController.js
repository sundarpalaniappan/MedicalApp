const httpStatus = require('http-status-codes');
const Medapp = require('../models/medappModel');

const medappConroller = function medappConroller() {
	const getMedicines = function getMedicines(req, res) {
		const query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		if (req.query.language) {
			query.language = req.query.language;
		}
		Medapp.find(query, (err, medicines) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).send(medicines);
			}
		});
	};
	const addMedicine = function addMedicine(req, res) {
		if (!req.body.name) {
			res.status(httpStatus.BAD_REQUEST);
			res.send('Name is mandatory');
		} else {
			const medicine = new Medapp(req.body);
			medicine.save((err) => {
				if (err) {
					res.status(httpStatus.INTERNAL_SERVER_ERROR);
					res.send(err);
				} else {
					res.status(httpStatus.CREATED);
					res.send(medicine);
				}
			});
		}
	};
	const findMedicine = function findMedicine(req, res, next) {
		Medapp.findById(req.params.Id, (err, medicine) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else if (medicine) {
				req.medicine = medicine;
				next();
			} else {
				res.status(httpStatus.NOT_FOUND).send('Medicine not found');
			}
		});
	};
	const replaceMedicine = function replaceMedicine(req, res) {
		req.medicine.name = req.body.name;
		req.medicine.quantity = req.body.quantity;
		req.medicine.save((err) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).json(req.medicine);
			}
		});
	};
	const updateMedicine = function updateMedicine(req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		Object.keys(req.body).forEach((key) => {
			req.medicine[key] = req.body[key];
		});
		req.medicine.save((err) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.OK).json(req.medicine);
			}
		});
	};
	const removeMedicine = function removeMedicine(req, res) {
		req.medicine.remove((err) => {
			if (err) {
				res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
			} else {
				res.status(httpStatus.NO_CONTENT).send('Deleted successfully');
			}
		});
	};
	const getMedicinebyId = function getMedicinebyId(req, res) {
		res.status(httpStatus.OK).json(req.medicine);
	};

	return {
		getMedicines,
		addMedicine,
		findMedicine,
		replaceMedicine,
		updateMedicine,
		removeMedicine,
		getMedicinebyId,
	};
};

module.exports = medappConroller;
