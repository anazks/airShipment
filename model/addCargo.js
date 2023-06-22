const mongoose = require('mongoose');


const addcargo = new mongoose.Schema({
    container: {
        type: String,
        required: [true, "Must Provide container"],
    }, 
    address: {
        type: String,
        required: [true, "Must Provide email"],
    },
    mobile: {
        type: String,
        required: [true, "Must Provide email"],
    },
    airNumber: {
        type: String,
        required: [true, "Must Provide email"],
    },
    status: {
        type: String,
        required: [true, "Must Provide email"],
        default:"pending"
    },
    userID:{
        type: String,
        required: [true, "Must Provide userID"],
       
    },
    Dboy:{
        type: String,
        required: [true, "Must Provide Dboy"],
        default:"Not assigned"
    },
    number:{
        type: String,
        required: [true, "Must Provide Dboy"],
        default:"Not assigned"
    },
    boyId:{
        type: String,
        required: [true, "Must Provide Dboy"],
        default:"Not assigned"
    },
    payment:{
        type: String,
        required: [true, "Must Provide Dboy"],
        default:"Not added"
    },
    paymentStatu:{
        type: String,
        required: [true, "Must Provide Dboy"],
        default:"Not added"
    }
})

module.exports = mongoose.model('addcargo', addcargo);  