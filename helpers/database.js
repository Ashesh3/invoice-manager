const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config['mongodb_uri'], { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

const InvoiceItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
})

const InvoiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    issue_date: { type: Date, default: Date.now },
    due_date: { type: Date, default: Date.now },
    items: [InvoiceItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: 'due' },
    notes: { type: String, default: '' },
    issuer: { type: String, default: '' },
});


module.exports = mongoose.model('Invoice', InvoiceSchema)
