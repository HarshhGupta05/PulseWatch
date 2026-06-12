import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
    name : { type: String, required : true },
    url:        { type: String, required: true },
    userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive:   { type: Boolean, default: true },
    alertEmail: { type: String },
}, {
    timestamps : true
});


const Monitor = mongoose.model('Monitor', monitorSchema);

export default Monitor;
