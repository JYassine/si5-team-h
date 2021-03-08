const express = require('express');

const customerRouter = express.Router();
const customerController = require('../controllers/customers');

/**
 * Get all modules statics infos
 */
customerRouter.route('/').get(async (req, res) => {
    if (req.query.firstName !== undefined && req.query.lastName !== undefined ) {
        try {
            return res.json(await customerController.customerByLastNameAndFirstName(req.query.firstName,req.query.lastName));
        } catch (err) {
            next(err);
        }
    }
    try {
        return res.json(await customerController.getCustomers());
    } catch (err) {
        next(err);
    }
});

customerRouter.route('/:id').get(async (req, res) => {
    try {
        return res.json(await customerController.getCustomerById(req.params.id));
    } catch (err) {
        next(err);
    }
});


module.exports = customerRouter;