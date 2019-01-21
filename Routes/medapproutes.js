const express = require('express');
const medappControllerfn = require('../Controllers/medappController');

const medappRouter = function medappRouter() {
	const router = express.Router();
	const medappController = medappControllerfn();
	router.route('/medapps')
		.get(medappController.getMedicines)
		.post(medappController.addMedicine);

	router.use('/medapps/:Id', medappController.findMedicine);
	router.route('/medapps/:Id')
		.get(medappController.getMedicinebyId)
		.put(medappController.replaceMedicine)
		.patch(medappController.updateMedicine)
		.delete(medappController.removeMedicine);
	return router;
};

module.exports = medappRouter;
