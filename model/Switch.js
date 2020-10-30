const mongoose = require('mongoose');

const switchSchema = new mongoose.Schema({
    name :  String,
    status : Number
});

const Switch = mongoose.model('switch', switchSchema, "SwitchD001");
module.exports = Switch;