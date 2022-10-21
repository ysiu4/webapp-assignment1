let mongoose = require('mongoose')

let BusinessContact = new mongoose.Schema(
    {
        name: {
            type: String,
            default: '',
            trim: true,
            required: true,
        },
        contact_number: {
            type: String,
            default: '',
            trim: true,
            required: true,
        },
        email: {
            type: String,
            default: '',
            trim: true,
            required: true,
        },
    },
    {
        collection: 'business_contacts',
    }
);

module.exports.BusinessContact = mongoose.model('BusinessContact', BusinessContact);
