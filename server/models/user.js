/* 
 * File: models/user.js
 * Student name: Yuk Ming Siu
 * Student ID: 301244053
 * Date: 2022-10-12
 * Course: COMP229-014
 */

let mongoose = require('mongoose')
let passport_local_mongoose = require('passport-local-mongoose')

let User = new mongoose.Schema(
    {
        username: {
            type: String,
            default: '',
            trim: true,
            required: true,
        },
        display_name: {
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
        organization: {
            type: String,
            default: '',
            trim: true,
            required: false,
        },
    },
    {
        collection: 'users',
    }
);

User.plugin(passport_local_mongoose, {
    //options
    missingPasswordError: 'Invalid password',
});

module.exports.User = mongoose.model('User', User);
