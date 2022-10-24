/* 
 * File: models/business_contact.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

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
