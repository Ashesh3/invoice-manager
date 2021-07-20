const express = require('express');
const router = express.Router();
const Invoice = require('../helpers/database');
const { sendResponse } = require('../helpers/response')
const { sendEmail } = require('../helpers/mail')

router.get('/', async (req, res) => {
    Invoice.find()
        .then(invoices => { sendResponse(res, 200, true, invoices) })
        .catch(err => { sendResponse(res, 500, false, err.message) });
});


router.put('/', async (req, res) => {
    Invoice.create(req.body)
        .then(invoice => { sendResponse(res, 200, true, { 'invoice_id': invoice._id }) })
        .catch(err => { sendResponse(res, 500, false, err.message) })
});

router.get('/:invoice_id', (req, res) => {
    Invoice.findById(req.params.invoice_id)
        .then(invoice => {
            if (!invoice) { sendResponse(res, 404, false, "Invoice not found") }
            else { sendResponse(res, 200, true, invoice) }
        })
        .catch(err => { sendResponse(res, 500, false, err.message) });
});

router.patch('/:invoice_id', async (req, res) => {
    Invoice.findByIdAndUpdate(req.params.invoice_id, req.body)
        .then(sendResponse(res, 200, true, 'Invoice updated successfully'))
        .catch(err => { sendResponse(res, 500, false, err.message) })
});

router.delete('/:invoice_id', async (req, res) => {
    Invoice.findByIdAndRemove(req.params.invoice_id)
        .then(invoice => { sendResponse(res, 200, true, `Invoice #${invoice._id} deleted`) })
        .catch(err => { sendResponse(res, 500, false, 'Invoice not found') })
});

router.get('/:invoice_id/email', async (req, res) => {
    Invoice.findByIdAndRemove(req.params.invoice_id)
        .then(invoice => {
            let result = sendEmail(invoice)
            sendResponse(result.success ? 200 : 500, result.success, result.data)
        })
        .catch(err => { sendResponse(res, 500, false, 'Invoice not found') })
});


module.exports = router;
