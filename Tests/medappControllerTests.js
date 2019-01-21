const sinon = require('sinon');
const httpstatuscode = require('http-status-codes');
const medappControllerfn = require('../Controllers/medappController');

describe('Medicine Controller Tests', () => {
	describe('Post Test', () => {
		it('Should not allow a medicine without name', () => {
			const req = {
				body: {
					quantity: '200',
				},
			};

			const res = {
				status: sinon.spy(),
				send: sinon.spy(),
				json: sinon.spy(),
			};

			const medappController = medappControllerfn();
			medappController.addMedicine(req, res);

			res.status.calledWith(httpstatuscode.BAD_REQUEST).should.equal(true, `Bad request${res.status.args[0][0]}`);
			res.send.calledWith('Name is mandatory').should.equal(true);
		});
	});
});
